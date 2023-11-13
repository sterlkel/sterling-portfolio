import { NextRequest, NextResponse } from "next/server";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export async function POST(request: NextRequest) {
  request.json().then((json) => console.log(json));

  const msg = {
    to: "sterlkel@gmail.com", // Change to your recipient
    from: "sterlkel@gmail.com", // Change to your verified sender
    replyTo: "swk49@cornell.edu",
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
      return new NextResponse("Email Sending Failed", { status: 500 });
    });

  return new NextResponse("Email sent", {
    status: 200,
  });
}
