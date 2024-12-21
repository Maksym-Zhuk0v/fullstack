"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  calendarWithAppointmentSchema,
  TCalendarWithAppointment,
} from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "./form-input";
import GroupCheckbox from "../../group-checkbox";
import { Button } from "@/shared/components/ui/button";
import { CalendarForm } from "../../calendar-form";
import toast from "react-hot-toast";
import { Api } from "@/shared/services/api-client";

export const GetInLineForm = () => {
  const [loading, setLoading] = React.useState(false);

  const form = useForm<TCalendarWithAppointment>({
    resolver: zodResolver(calendarWithAppointmentSchema),
    defaultValues: {
      date: undefined,
      available: "false",
      appointmentId: undefined,
      appointment: null,
    },
  });

  const onSubmit = async () => {
    try {
      setLoading(true);
      await Api.appointment.create({
        email: form.getValues("appointment.email") || "",
        fullName: form.getValues("appointment.fullName") || "",
        typeOfDamage: form.getValues("appointment.typeOfDamage") || [""],
        dateTime: form.getValues("date") || new Date(),
      });
      toast.success("E-Mail sent successfully", {
        icon: "✅",
      });
      form.reset({
        date: new Date(),
        appointment: null,
        available: "false",
        appointmentId: undefined,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <h2 className="text-5xl font-semibold">Get in line</h2>
            <p className="text-gray-400">Fill the form to get in line</p>
          </div>
        </div>
        <FormInput name="appointment.email" label="E-Mail" required />
        <FormInput name="appointment.fullName" label="Full Name" required />
        <GroupCheckbox form={form} />
        <CalendarForm form={form} />
        <Button
          loading={loading}
          className="h-12 text-base"
          type="submit"
          variant={"outline"}
        >
          Get in line
        </Button>
      </form>
    </FormProvider>
  );
};
