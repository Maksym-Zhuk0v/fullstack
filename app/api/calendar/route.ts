import { prisma } from "@/prisma/prisma-clietn";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const calendar = await prisma.calendar.findMany();
  return NextResponse.json(calendar);
}

export async function DELETE(req: NextRequest) {
  try {
    const ids = await req.json();
    if (!ids || ids.length === 0) {
      throw new Error("No appointment IDs provided");
    }

    await prisma.calendar.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    await prisma.appointment.deleteMany({
      where: {
        calendarId: { in: ids },
      },
    });

    return NextResponse.json("deleted");
  } catch (err) {
    console.log("Error [DELETE_APPOINTMENT]", err);
    throw err;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const isAlikeCalendar = await prisma.calendar.findFirst({
      where: {
        date: body.date,
      },
    });
    if (isAlikeCalendar) {
      throw new Error("Calendar already exists");
    }
    const calendar = await prisma.calendar.create({
      data: {
        date: body.date,
        available: body.email,
      },
    });
    return NextResponse.json("calendar has been created");
  } catch (err) {
    console.log("Error [ADD_CALENDAR]", err);
    throw err;
  }
}
