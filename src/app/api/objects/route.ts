// import { NextRequest, NextResponse } from 'next/server';
// import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

// const client = new S3Client({
//   credentials: {
//     accessKeyId: process.env.ACCESS_KEY as string,
//     secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
//   },
//   region: "ap-south-1"
// });

// export async function GET(request: NextRequest) {
//   // If user sends ?prefix=something/, we look inside that folder
//   const Prefix = request.nextUrl.searchParams.get('prefix') ?? "";

//   const command = new ListObjectsV2Command({
//     Bucket: "file-manager-nadt-s3",
//     Delimiter: "/",  // important: groups by folder
//     Prefix,          // list from this folder
//   });

//   const result = await client.send(command);

//   // Root-level files
//   const files = result.Contents?.map(e => ({
//     Key: e.Key,
//     Size: e.Size,
//     LastModified: e.LastModified,
//   })) ?? [];

//   // Root-level folders
//   const folders = result.CommonPrefixes?.map(cp => ({
//     Prefix: cp.Prefix,
//   })) ?? [];

//   return NextResponse.json({
//     folders,
//     files,
//   });
// }




// app/api/objects/route.ts
import { NextRequest, NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

console.log("clerk key:-",process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
console.log("clerk secret key:-",process.env.CLERK_SECRET_KEY)

// Re-use AWS client (configured from env vars)
const client = new S3Client({
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.MY_AWS_SECRET_KEY as string,
  },
  region: process.env.MY_AWS_REGION as string,
});

export async function GET(request: NextRequest) {
  try {
    const Prefix = request.nextUrl.searchParams.get("prefix") ?? "";

    const command = new ListObjectsV2Command({
      Bucket: process.env.MY_AWS_BUCKET as string,
      Delimiter: "/", // group by folder
      Prefix,
    });

    const result = await client.send(command);

    const files =
      result.Contents?.map((e) => ({
        Key: e.Key,
        Size: e.Size,
        LastModified: e.LastModified,
      })) ?? [];

    const folders =
      result.CommonPrefixes?.map((cp) => ({
        Prefix: cp.Prefix,
      })) ?? [];

    return NextResponse.json({ folders, files });
  } catch (err: any) {
    console.error("S3 Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch S3 objects", details: err.message },
      { status: 500 }
    );
  }
}
