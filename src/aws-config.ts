// aws.config.ts
import { S3Client } from "@aws-sdk/client-s3";

console.log("s3",process.env.MY_AWS_ACCESS_KEY!)
console.log("s3",process.env.MY_AWS_SECRET_KEY!)

export const s3 = new S3Client({
  region: process.env.MY_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.MY_AWS_SECRET_KEY!,
  },
});
