// app/api/download-multiple/route.ts
import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { PassThrough } from "stream";
import archiver from "archiver";

const s3 = new S3Client({
  region: process.env.MY_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.MY_AWS_SECRET_KEY!,
  },
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const keys = searchParams.getAll("keys");

  if (keys.length === 0) {
    return NextResponse.json({ error: "No files selected" }, { status: 400 });
  }

  // Streaming ZIP
  const passThrough = new PassThrough();
  const archive = archiver("zip", { zlib: { level: 9 } });
  archive.pipe(passThrough);

  for (const key of keys) {
    try {
      const command = new GetObjectCommand({
        Bucket: process.env.MY_AWS_BUCKET!,
        Key: key,
      });
      const result = await s3.send(command);
      if (result.Body) {
        archive.append(result.Body as any, { name: key.split("/").pop()! });
      }
    } catch (err) {
      console.error("Error fetching file:", key, err);
    }
  }

  archive.finalize();

  return new NextResponse(passThrough as any, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="files.zip"`,
    },
  });
}
