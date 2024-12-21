import { prisma } from "@/prisma/prisma-clietn";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const calendarId = Number(params.id);
    const { date, available, appointment } = await req.json();

    if (!date || !appointment || typeof available !== "string") {
      return NextResponse.json(
        { error: "Invalid input data." },
        { status: 400 }
      );
    }

    const existingCalendar = await prisma.calendar.findUnique({
      where: { id: calendarId },
      include: { appointment: true },
    });

    const appointmentId = existingCalendar?.appointment?.id;

    await prisma.calendar.update({
      where: {
        id: calendarId,
      },
      data: {
        available: "false",
        appointment: { disconnect: true },
      },
    });

    const newCalendar = await prisma.calendar.findFirst({
      where: {
        date: date,
      },
    });

    await prisma.calendar.update({
      where: {
        id: newCalendar?.id,
      },
      data: {
        appointment: { connect: { id: appointmentId } },
        available: appointment.email,
      },
    });

    await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        typeOfDamage: appointment.typeOfDamage,
        fullName: appointment.fullName,
      },
    });
    return NextResponse.json({
      message: "Calendar and appointment updated successfully.",
    });
  } catch (err) {
    console.error("Error updating calendar and appointment:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const appointment = await prisma.calendar.findFirst({
      where: {
        id: id,
      },
      include: {
        appointment: true,
      },
    });
    return NextResponse.json(appointment);
  } catch (err) {
    console.log("Error [GET_APPOINTMENTS]", err);
  }
}
