import { prisma } from "@/prisma/prisma-clietn";
import { cookies } from "next/headers";

export async function getAppointmentByToken() {
  try {
    const cookieStore = cookies();

    let token = cookieStore.get("cartToken")?.value;
    if (!token) {
      return false;
    }

    const appointments = await prisma.appointment.findFirst({
      where: {
        token: token,
      },
    });

    if (!appointments) {
      return false;
    }

    if (!appointments.verified) {
      return false;
    }

    return appointments;
  } catch (err) {
    console.log("Error [GET_APPOINTMENTS]", err);
    throw err;
  }
}
