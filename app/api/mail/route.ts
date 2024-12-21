import type { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
const nodemailer = require("nodemailer");

type Data = {
  message: string;
};

export async function POST(req: NextRequest, res: NextApiResponse<Data>) {
  const body = await req.json();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"Your Name" <donotreply@begege.com>',
      to: body.to,
      subject: body.subject,
      text: body.text,
    });
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json("sent");
}
