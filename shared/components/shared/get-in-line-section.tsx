import React from "react";
import Container from "./Container";
import { GetInLineForm } from "./modals/form/get-in-line-form";
import Appointment from "./appointment";
import Link from "next/link";
import { Button } from "../ui/button";
import { isAppointment } from "@/shared/lib/is-appointment";

interface Props {
  isImage?: boolean;
  className?: string;
}

const GetInLineSection = async ({ isImage, className }: Props) => {
  const isAppointmentCreated = await isAppointment();

  return (
    <div className={`box-shadow-inside-top w-[450px] ${className}`}>
      {!isAppointmentCreated ? (
        <Container className="px-6 w-full">
          <div id="get-in-line" className="flex justify-between gap-4">
            <div className="w-[480px] flex flex-col items-start p-6 rounded-lg border border-border bg-background shadow-sm">
              <GetInLineForm />
            </div>
            <div
              className="w-1/2 bg-center bg-no-repeat bg-cover rounded-3xl"
              style={{
                display: isImage === undefined ? "block" : "none",
                backgroundImage:
                  "url(https://brightonpanelworks.com.au/wp-content/uploads/2022/05/mechanic-in-overalls-repairing-car-in-auto-repair-2021-08-29-22-51-18-utc-1-1080x675.jpg)",
              }}
            />
          </div>
        </Container>
      ) : (
        <Container className="px-6 w-full">
          <div id="get-in-line" className="flex gap-4 justify-between">
            <div
              className="w-0 bg-center bg-no-repeat bg-cover rounded-3xl grow"
              style={{
                display: isImage === undefined ? "block" : "none",
                backgroundImage:
                  "url(https://brightonpanelworks.com.au/wp-content/uploads/2022/05/mechanic-in-overalls-repairing-car-in-auto-repair-2021-08-29-22-51-18-utc-1-1080x675.jpg)",
              }}
            />
            <div className="w-0 grow flex flex-col items-start p-6 rounded-lg border border-border bg-background shadow-sm">
              <div className="flex gap-4">
                <div>
                  <h1 className="text-3xl font-bold">You already scheduled</h1>
                  <p className="text-lg mb-4 text-gray-400">
                    you can not schedule a new one
                  </p>
                </div>
                <Button asChild variant={"link"}>
                  <Link className="inset-o" href={"/appointment"}>
                    Edit
                  </Link>
                </Button>
              </div>
              <Appointment />
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default GetInLineSection;
