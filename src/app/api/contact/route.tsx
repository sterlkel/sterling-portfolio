import { ContactFormData } from "@/types";
import { NextRequest, NextResponse } from "next/server";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export async function POST(request: NextRequest) {
  const json: ContactFormData = await request.json();

  const msg = {
    to: "sterlkel@gmail.com", // Change to your recipient
    from: "sterlkel@gmail.com", // Change to your verified sender
    replyTo: json.email,
    subject: `PW Contact From ${json.name}`,
    text: json.message,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    // still need to determine what the error type is
    .catch((error: any) => {
      console.error(error);
      return new NextResponse("Email Sending Failed", { status: 500 });
    });

  return new NextResponse("Email sent", {
    status: 200,
  });
}
