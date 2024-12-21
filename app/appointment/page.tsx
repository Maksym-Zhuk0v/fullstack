import Appointment from "@/shared/components/shared/appointment";
import Container from "@/shared/components/shared/Container";
import React from "react";

const page = () => {
  return (
    <Container className="max-w-[580px]">
      <Appointment />
    </Container>
  );
};

export default page;
