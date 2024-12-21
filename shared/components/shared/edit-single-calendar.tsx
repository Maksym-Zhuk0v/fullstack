"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "./Container";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  TCalendarWithAppointment,
  calendarWithAppointmentSchema,
} from "./modals/form/schemas";
import { CalendarForm } from "./calendar-form";
import GroupCheckbox from "./group-checkbox";
import { Skeleton } from "@/shared/components/ui/skeleton";
import CencelAppointment from "./cencel-appointment";
import { Api } from "@/shared/services/api-client";

interface Props {
  id: string;
}

const EditSingleCalendar = ({ id }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const form = useForm<TCalendarWithAppointment>({
    resolver: zodResolver(calendarWithAppointmentSchema),
    defaultValues: {
      date: undefined,
      available: "false",
      appointmentId: 0,
      appointment: null,
    },
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Api.calendar.getOne(Number(id));
        if (data) {
          form.reset({
            date: new Date(data.date),
            available: data.available,
            appointmentId: data.appointmentId || 0,
            appointment:
              (data.appointment &&
                data.appointment && {
                  fullName: data.appointment.fullName,
                  email: data.appointment.email,
                  typeOfDamage: data.appointment.typeOfDamage,
                  dateTime: undefined,
                }) ||
              null,
          });
        }
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    };

    fetchData();
  }, [id, form]);

  if (form.getValues("appointment") === null) {
    return (
      <div className="flex flex-col space-y-3 gap-6 max-w-lg mx-auto">
        {form.getValues("date") && (
          <h2>
            Time for this appointment is
            {form.getValues("date")?.toLocaleString()}
          </h2>
        )}
        <Skeleton className="h-[450px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  const onSubmit = async (data: TCalendarWithAppointment) => {
    try {
      setLoading(true);
      await Api.calendar.edit(Number(id), data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 max-w-lg mx-auto"
        >
          <h2 className="text-3xl font-semibold">Edit Calendar</h2>
          <p className="text-gray-600">
            Modify the calendar details and update the appointment.
          </p>
          <CalendarForm form={form} />
          {form.getValues("appointment")?.email !== "" && (
            <div>
              <h3 className="text-lg font-medium">Appointment Details</h3>
              <Label
                htmlFor="appointment.fullName"
                className="text-sm font-medium"
              >
                Full Name
              </Label>
              <Input
                id="appointment.fullName"
                {...form.register("appointment.fullName")}
                className="mt-2"
              />
              <Label
                htmlFor="appointment.email"
                className="text-sm font-medium mt-4"
              >
                Email
              </Label>
              <Input
                id="appointment.email"
                {...form.register("appointment.email")}
                disabled
                className="mt-2"
              />
            </div>
          )}
          <GroupCheckbox form={form} />
          <Button type="submit" loading={loading} className="w-full">
            Save Changes
          </Button>
          <CencelAppointment id={form.getValues("appointmentId") || 0} />
        </form>
      </FormProvider>
    </Container>
  );
};

export default EditSingleCalendar;
