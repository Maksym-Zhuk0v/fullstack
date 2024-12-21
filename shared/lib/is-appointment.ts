import { cookies } from "next/headers";
import { getUserSession } from "./get-user-session";
import { getAppointmentByToken } from "./getAppointmentByToken";
import { getAppointmentByUser } from "./getAppointmentByUser";

export async function isAppointment() {
  try {
    const session = await getUserSession();

    if (!session) {
      const cookieStore = cookies();
      let token = cookieStore.get("cartToken")?.value;
      if (!token) {
        return false;
      }
      const appointment = getAppointmentByToken();
      return appointment;
    }

    const appointment = await getAppointmentByUser();

    return appointment;
  } catch (err) {
    console.log("Error [GET_APPOINTMENTS]", err);
    throw err;
  }
}
