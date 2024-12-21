import { getUserSession } from "@/shared/lib/get-user-session";
import { prisma } from "@/prisma/prisma-clietn";

export async function getAppointmentByUser() {
  try {
    const session = await getUserSession();
    if (!session) {
      return false;
    }

    const appointment = await prisma.appointment.findFirst({
      where: {
        userId: +session.id,
      },
    });

    if (!appointment) {
      return false;
    }

    if (!appointment.verified) {
      return false;
    } else {
      return appointment;
    }
  } catch (err) {
    console.log("Error [GET_APPOINTMENTS]", err);
    throw err;
  }
}
