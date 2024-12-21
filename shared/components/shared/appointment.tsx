import React from "react";
import GoogleMapComponent from "./google-map";
import CencelAppointment from "@/shared/components/shared/cencel-appointment";
import { isAppointment } from "@/shared/lib/is-appointment";

const Appointment = async () => {
  const appointment = await isAppointment();

  if (!appointment) {
    return (
      <div>
        <h1>You o not have an appointment</h1>
      </div>
    );
  }

  return (
    <div className="text-gray-200 text-base font-light w-full gap-6 min-h-96">
      <div className="w-full">
        <CencelAppointment id={appointment.id} />
        <h2 className="text-xl font-bold">
          {appointment.fullName} - made a appointment on{" "}
          {appointment.dateTime?.toLocaleString()} for{" "}
          {appointment.typeOfDamage.join(", ")}.
        </h2>
        <p className="mt-2">
          Make sure to arrive at{" "}
          <span className="font-bold">Gutenbergstrasse 10.</span>
          Be here in time, otherwise we will cancel your appointment. Lorem
          ipsum dolor sit, amet consectetur adipisicing elit. Sint magnam fuga
          laboriosam, facere hic, ullam fugiat eligendi expedita reprehenderit
          porro.
        </p>
      </div>
      <div className="w-full h-[400px] flex flex-col gap-4 mt-4">
        <GoogleMapComponent />
        <a
          href="https://www.google.com/maps/search/Gutenbergstrasse+10/@48.1500631,8.1341233,9z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI0MDkyOS4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Take a ride
        </a>
      </div>
    </div>
  );
};

export default Appointment;
