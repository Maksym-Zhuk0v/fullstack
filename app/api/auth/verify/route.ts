import { prisma } from "@/prisma/prisma-clietn";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "there is no code" }, { status: 400 });
    }

    const verificationCode = await prisma.registerVerificationCode.findFirst({
      where: {
        code: code,
      },
    });

    if (!verificationCode) {
      return false;
    }

    await prisma.user.update({
      where: {
        id: +verificationCode.userId,
      },
      data: {
        verified: new Date(),
      },
    });

    await prisma.registerVerificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    });
    return NextResponse.redirect(new URL("/?verified", req.url));
  } catch (error) {
    console.error(error);
  }
}
