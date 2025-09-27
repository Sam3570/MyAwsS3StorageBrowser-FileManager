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

// File types that can be previewed in the browser
const PREVIEW_EXTENSIONS = [
  "pdf", "png", "jpg", "jpeg", "gif", "webp",
  "mp4", "webm", "ogg", "mp3", "wav", "txt"
];

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

    const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });

    // Get file extension
    const ext = key.split(".").pop()?.toLowerCase() || "";

    if (PREVIEW_EXTENSIONS.includes(ext)) {
      // ✅ Previewable → open in browser
      return Response.redirect(signedUrl, 302);
    } else {
      // ✅ Non-previewable → force download
      return new Response(null, {
        status: 302,
        headers: {
          Location: signedUrl,
          "Content-Disposition": `attachment; filename="${encodeURIComponent(
            key.split("/").pop() || "file"
          )}"`,
        },
      });
    }
  } catch (err) {
    console.error("Download error:", err);
    return new Response("Failed to generate signed URL", { status: 500 });
  }
}
