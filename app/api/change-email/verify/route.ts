import { getUserSession } from "@/shared/lib/get-user-session";
import { sendMail } from "@/shared/lib/send-mail";
import { prisma } from "@/prisma/prisma-clietn";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "there is no code" }, { status: 400 });
    }

    const verificationCode =
      await prisma.changeProrileVerificationCode.findFirst({
        where: {
          code: code,
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

    const user = await prisma.user.findFirst({
      where: {
        email: ChangeProrile?.currEmail,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "user has not been found by ChangeProrile?.currEmail" },
        { status: 400 }
      );
    }

    const session = await getUserSession();

    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (user.id !== +session.id) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    await sendMail({
      to: ChangeProrile?.newEmail,
      subject: "Подтверждение почты",
      text: `Ваш код подтверждения: http://localhost:3000/api/approve-email/verify?code=${code}`,
    });

    return NextResponse.redirect(new URL("/profile", req.url));
  } catch (error) {
    console.error(error);
    console.log("[VERIFY_GET] Server error", error);
  }
}
