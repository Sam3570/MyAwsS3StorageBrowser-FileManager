import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// ✅ Initialize SES client with env vars
const ses = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const { fileName, userEmail, description } = await req.json();

    if (!fileName || !userEmail) {
      return NextResponse.json(
        { message: "File name and user email are required" },
        { status: 400 }
      );
    }

    const params = {
      Destination: {
        ToAddresses: [process.env.ADMIN_EMAIL!], // where you receive requests
      },
      Message: {
        Body: {
          Text: {
            Data: `📂 New File Request

File Name: ${fileName}
Requested By: ${userEmail}
Description: ${description || "No description provided"}`,
          },
        },
        Subject: { Data: `File Request: ${fileName}` },
      },
      Source: process.env.SENDER_EMAIL!, // must be verified in SES
    };

    await ses.send(new SendEmailCommand(params));

    return NextResponse.json({ message: "Request sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("SES Error:", error);
    return NextResponse.json(
      { message: "Error sending request", error: String(error) },
      { status: 500 }
    );
  }
}
