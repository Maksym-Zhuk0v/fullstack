"use server";

import { sendMail } from "@/shared/lib/send-mail";
import { prisma } from "@/prisma/prisma-clietn";
import { getAppointmentByToken } from "@/shared/lib/getAppointmentByToken";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";
import { Api } from "@/shared/services/api-client";

export async function registerUser(body: any) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error("Почта не подтверждена");
      }

      throw new Error("Пользователь уже существует");
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await prisma.registerVerificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendMail({
      to: createdUser.email,
      text: `Here is your verification code: ${code} or just click the link to confirm http://localhost:3000/api/auth/verify?code=${code}`,
      subject: "Подтверждение почты",
    });

    const cookieStore = cookies();
    const token = cookieStore.get("cartToken")?.value;

    if (token) {
      const appointmentByToken = await getAppointmentByToken();
      if (appointmentByToken) {
        const appointmentByUser = prisma.appointment.findFirst({
          where: {
            userId: createdUser.id,
          },
        });
        if (!appointmentByUser) {
          await prisma.appointment.update({
            where: {
              id: appointmentByToken.id,
            },
            data: {
              userId: createdUser.id,
            },
          });
        }
      }
    }

    return true;
  } catch (err) {
    console.log("Error [CREATE_USER]", err);
    throw err;
  }
}
