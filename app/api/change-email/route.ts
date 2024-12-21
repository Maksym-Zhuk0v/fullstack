import { prisma } from "@/prisma/prisma-clietn";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      let token = req.cookies.get("cartToken")?.value;
      if (!token) {
        token = crypto.randomUUID();
      }

      const appointment = await prisma.appointment.findFirst({
        where: {
          token,
        },
      });

      if (!appointment) {
        await prisma.appointment.create({
          data: {
            email: body.email,
            fullName: body.fullName,
            typeOfDamage: body.typeOfDamage,
            dateTime: body.dateTime,
            token,
          },
        });

        return NextResponse.json("createdAppointment");
      }

      await prisma.appointment.update({
        where: {
          id: appointment.id,
        },
        data: {
          email: body.email,
          fullName: body.fullName,
          typeOfDamage: body.typeOfDamage,
          dateTime: body.dateTime,
        },
      });

      const resp = NextResponse.json("updatedUserCart");
      resp.cookies.set("cartToken", token);

      return resp;
    } else {
      let token = req.cookies.get("cartToken")?.value;
      if (!token) {
        token = crypto.randomUUID();
      }

      await prisma.appointment.create({
        data: {
          email: body.email,
          fullName: body.fullName,
          typeOfDamage: body.typeOfDamage,
          dateTime: body.dateTime,
          token,
        },
      });

      const resp = NextResponse.json("updatedUserCart");
      resp.cookies.set("cartToken", token);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function DELETE() {
  try {
    await prisma.appointment.delete({
      where: {
        id: 3,
      },
    });
    return NextResponse.json("deleted");
  } catch (err) {
    console.log(err);
  }
}
