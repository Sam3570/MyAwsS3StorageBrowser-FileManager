import { NextRequest } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY as string,
    secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
  },
  region: "ap-south-1",
});

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");

  if (!key) {
    return new Response(JSON.stringify({ error: "Missing key" }), {
      status: 400,
    });
  }

  try {
    const command = new GetObjectCommand({
      Bucket: "file-manager-nadt-s3",
      Key: key,
    });

    const result = await client.send(command);

    return new Response(result.Body as any, {
      headers: {
        "Content-Type": result.ContentType || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(
          key.split("/").pop() || key
        )}"`,
      },
    });
  } catch (err) {
    console.error("Download error:", err);
    return new Response(JSON.stringify({ error: "File not found" }), {
      status: 404,
    });
  }
}
