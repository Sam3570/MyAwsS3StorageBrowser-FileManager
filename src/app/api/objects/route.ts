import { NextRequest, NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY as string,
    secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
  },
  region: "ap-south-1"
});

export async function GET(request: NextRequest) {
  // If user sends ?prefix=something/, we look inside that folder
  const Prefix = request.nextUrl.searchParams.get('prefix') ?? "";

  const command = new ListObjectsV2Command({
    Bucket: "file-manager-nadt-s3",
    Delimiter: "/",  // important: groups by folder
    Prefix,          // list from this folder
  });

  const result = await client.send(command);

  // Root-level files
  const files = result.Contents?.map(e => ({
    Key: e.Key,
    Size: e.Size,
    LastModified: e.LastModified,
  })) ?? [];

  // Root-level folders
  const folders = result.CommonPrefixes?.map(cp => ({
    Prefix: cp.Prefix,
  })) ?? [];

  return NextResponse.json({
    folders,
    files,
  });
}
