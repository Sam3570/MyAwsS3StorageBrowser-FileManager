import { NextRequest } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import JSZip from "jszip";
import { Readable } from "stream";

// ✅ Setup S3 client
const client = new S3Client({
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.MY_AWS_SECRET_KEY as string,
  },
  region: process.env.MY_AWS_REGION || "ap-south-1",
});

// ✅ Convert S3 stream → Buffer
async function streamToBuffer(stream: any): Promise<Buffer> {
  if (stream instanceof Readable) {
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
  }
  throw new Error("Invalid stream type from S3");
}

export async function GET(request: NextRequest) {
  const keys = request.nextUrl.searchParams.getAll("keys");

  if (!keys || keys.length === 0) {
    return new Response(JSON.stringify({ error: "Missing keys" }), {
      status: 400,
    });
  }

  try {
    const zip = new JSZip();

    // 🔹 Fetch each file from S3
    for (const key of keys) {
      const command = new GetObjectCommand({
        Bucket: process.env.MY_AWS_BUCKET!,
        Key: key,
      });

      const result = await client.send(command);

      if (!result.Body) continue;

      const fileBuffer = await streamToBuffer(result.Body);
      const filename = key.split("/").pop() || key;

      zip.file(filename, fileBuffer);
    }

    // 🔹 Generate ZIP as ArrayBuffer (not Node Buffer)
    const zipArrayBuffer = await zip.generateAsync({ type: "arraybuffer" });

    // 🔹 Send response
    return new Response(zipArrayBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="files.zip"`,
      },
    });
  } catch (err) {
    console.error("Download-multiple error:", err);
    return new Response(JSON.stringify({ error: "Failed to create ZIP" }), {
      status: 500,
    });
  }
}
