import { prisma } from "@/prisma/prisma-clietn";
import { getUserSession } from "./get-user-session";
import { sendMail } from "./send-mail";

export async function changeEmail(body: any) {
  try {
    const session = await getUserSession();
    if (!session) {
      throw new Error("You are not logged in");
    }

    const user = await prisma.user.findFirst({
      where: {
        id: +session.id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const provider = await prisma.changeProrile.create({
      data: {
        currEmail: user.email,
        newEmail: body.email,
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.changeProrileVerificationCode.create({
      data: {
        code: code,
        changeProrile: provider.id,
      },
    });

    await sendMail({
      to: user.email,
      text: `Here is your verification code: http://localhost:3000/api/change-email/verify?code=${code}`,
      subject: "Approve email change",
    });
  } catch (err) {
    console.log("Error [CHANGE_EMAIL]", err);
    throw err;
  }
}
