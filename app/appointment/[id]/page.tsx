import { getUserSession } from "@/shared/lib/get-user-session";
import Container from "@/shared/components/shared/Container";
import EditSingleCalendar from "@/shared/components/shared/edit-single-calendar";
import { redirect } from "next/navigation";
import React from "react";

interface Params {
  id: string;
}

const page = async ({ params }: { params: Params }) => {
  const session = await getUserSession();

  if (!session) {
    redirect("/not-authorized");
  }

  if (session.role !== "ADMIN") {
    redirect("/not-authorized");
  }

  return (
    <Container>
      <EditSingleCalendar id={params.id} />
    </Container>
  );
};

export default page;
