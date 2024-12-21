import { prisma } from "@/prisma/prisma-clietn";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const calendar = await prisma.calendar.update({
      where: {
        appointmentId: +id,
      },
      data: {
        available: "false",
      },
    });

    await prisma.appointment.delete({
      where: {
        id: +id,
      },
    });
    return NextResponse.json("deleted");
  } catch (err) {
    console.log("Error [GET_APPOINTMENTS]", err);
    throw err;
  }
}
