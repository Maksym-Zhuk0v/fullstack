"use client";

import React from "react";
import { Button } from "../ui/button";
import { Api } from "@/shared/services/api-client";

const CencelAppointment = ({ id }: { id: number }) => {
  return (
    <Button
      className="block mb-4"
      onClick={async () => {
        console.log(id);
        await Api.appointment.cencel(id);
        window.location.reload();
      }}
    >
      Cancel appointment
    </Button>
  );
};

export default CencelAppointment;
