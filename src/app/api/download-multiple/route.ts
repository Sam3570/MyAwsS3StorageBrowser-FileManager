import { NextRequest } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import JSZip from "jszip";

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.MY_AWS_SECRET_KEY!,
  },
  region: process.env.MY_AWS_REGION!,
});

async function streamToBuffer(stream: any): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  return Buffer.concat(chunks);
}

export async function GET(req: NextRequest) {
  const keys = req.nextUrl.searchParams.getAll("keys");
  if (!keys || keys.length === 0) return new Response("Missing keys", { status: 400 });

  const zip = new JSZip();

  for (const key of keys) {
    const cmd = new GetObjectCommand({ Bucket: process.env.MY_AWS_BUCKET, Key: key });
    const data = await s3.send(cmd);
    if (!data.Body) continue;
    const fileBuffer = await streamToBuffer(data.Body);
    zip.file(key.split("/").pop()!, fileBuffer);
  }

  const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });
  return new Response(zipBuffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="files.zip"`,
    },
  });
}
