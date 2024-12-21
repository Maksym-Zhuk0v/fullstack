import { prisma } from "@/prisma/prisma-clietn";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "Неверный код" }, { status: 400 });
    }

    const verificationCode = await prisma.appointmentVerificationCode.findFirst(
      {
        where: {
          code,
        },
      }
    );

    if (!verificationCode) {
      return NextResponse.json({ error: "Неверный код" }, { status: 400 });
    }

    await prisma.appointment.update({
      where: {
        id: verificationCode.appointmentId,
      },
      data: {
        verified: new Date(),
      },
    });

    await prisma.appointmentVerificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    });

    return NextResponse.redirect(new URL("/appointment", req.url));
  } catch (error) {
    console.error(error);
    console.log("[VERIFY_GET] Server error", error);
  }
}
