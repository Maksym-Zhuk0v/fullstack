import { prisma } from "@/prisma/prisma-clietn";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sendMail } from "@/shared/lib/send-mail";
import { getUserSession } from "@/shared/lib/get-user-session";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const selectedTime = await prisma.calendar.findFirst({
      where: {
        date: body.dateTime,
      },
    });

    if (!selectedTime) {
      return "failed to find selected time";
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const session = await getUserSession();

    if (!session) {
      const cookieStore = cookies();
      let token = cookieStore.get("cartToken")?.value;

      if (!token) {
        const token = crypto.randomUUID();
        cookieStore.set("cartToken", token, {
          httpOnly: true,
        });
      }

      const createdAppointment = await prisma.appointment.create({
        data: {
          calendarId: +selectedTime.id,
          email: body.email,
          fullName: body.fullName,
          typeOfDamage: body.typeOfDamage,
          dateTime: body.dateTime,
          token: token,
        },
      });

      await prisma.appointmentVerificationCode.create({
        data: {
          code: code,
          appointmentId: createdAppointment.id,
        },
      });

      await sendMail({
        to: body.email,
        text:
          "Here is your verification code: http://localhost:3000/api/appointment/verify?code=" +
          code,
        subject: "Approve appointment",
      });

      await prisma.calendar.update({
        where: {
          id: selectedTime?.id,
        },
        data: {
          available: body.email,
          appointmentId: createdAppointment.id,
        },
      });
      return "created Appointment";
    } else {
      const createdAppointment = await prisma.appointment.create({
        data: {
          email: body.email,
          fullName: body.fullName,
          typeOfDamage: body.typeOfDamage,
          dateTime: selectedTime.date,
          calendarId: +selectedTime.id,
          userId: +session.id || 0,
        },
      });

      await prisma.appointmentVerificationCode.create({
        data: {
          code: code,
          appointmentId: createdAppointment.id,
        },
      });
      await sendMail({
        to: body.email,
        text:
          "Here is your verification code: http://localhost:3000/api/appointment/verify?code=" +
          code,
        subject: "Approve appointment",
      });

      await prisma.calendar.update({
        where: {
          id: selectedTime?.id,
        },
        data: {
          available: body.email,
          appointmentId: createdAppointment.id,
        },
      });
      return NextResponse.json("appointment created");
    }
  } catch (err) {
    console.log("Error [CREATE_APPOINTMENT]", err);
    throw err;
  }
}
