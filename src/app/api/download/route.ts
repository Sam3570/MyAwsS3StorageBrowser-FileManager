import { NextRequest } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.MY_AWS_SECRET_KEY as string,
  },
  region: "ap-south-1",
});

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");

  if (!key) {
    return new Response("Missing key", { status: 400 });
  }

  try {
    const command = new GetObjectCommand({
      Bucket: "file-manager-nadt-s3",
      Key: key,
    });

    // Generate a signed URL valid for 1 hour
    const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });

    // ✅ Redirect instead of returning JSON
    return Response.redirect(signedUrl, 302);
  } catch (err) {
    console.error("Download error:", err);
    return new Response("Failed to generate signed URL", { status: 500 });
  }
}
