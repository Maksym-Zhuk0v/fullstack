import { prisma } from "@/prisma/prisma-clietn";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  try {
    const code = req.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "there is no code" }, { status: 400 });
    }

    const verificationCode =
      await prisma.changeProrileVerificationCode.findFirst({
        where: {
          code,
        },
      });

    if (!verificationCode) {
      return NextResponse.json(
        { error: "code has not been found" },
        { status: 400 }
      );
    }

    const ChangeProrile = await prisma.changeProrile.findFirst({
      where: {
        id: verificationCode.changeProrile,
      },
    });

    if (!ChangeProrile) {
      return NextResponse.json(
        {
          error:
            "changeProrile has not been found by verificationCode.changeProrile",
        },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: {
        email: ChangeProrile.currEmail,
      },
      data: {
        email: ChangeProrile.newEmail,
      },
    });

    await prisma.changeProrile.delete({
      where: {
        id: ChangeProrile.id,
      },
    });

    await prisma.changeProrileVerificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    });

    return NextResponse.redirect(new URL("/profile", req.url));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
