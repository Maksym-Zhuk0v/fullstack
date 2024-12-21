"use client";

import { CalendarIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import React from "react";
import { TCalendarWithAppointment } from "./modals/form/schemas";
import { Api } from "@/shared/services/api-client";

interface CalendarFormProps {
  form: UseFormReturn<TCalendarWithAppointment>;
}

export function CalendarForm({ form }: CalendarFormProps) {
  const [selectedDate, setDate] = React.useState<Date | undefined>(new Date());
  const [availableDates, setAvailableDates] = React.useState<
    {
      date: Date;
      available: string;
      id: number;
    }[]
  >([]);

  React.useEffect(() => {
    async function fetchCalendar() {
      const calendar = await Api.calendar.getAll();
      setAvailableDates(
        calendar.map((item: any) => ({
          ...item,
          date: new Date(item.date),
        }))
      );
    }
    fetchCalendar();
  }, []);

  return (
    <FormField
      control={form.control}
      name="date"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Schedule appointment</FormLabel>
          <br />
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  {selectedDate ? (
                    selectedDate.toLocaleDateString("en-GB")
                  ) : (
                    <span>pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  const chosenDate = new Date(date as Date);
                  const selectedDateItem = availableDates.find(
                    (availableDate) =>
                      availableDate.date.toDateString() ===
                      chosenDate.toDateString()
                  );
                  setDate(chosenDate);
                }}
                disabled={(date) =>
                  !availableDates.some(
                    (availableDate) =>
                      availableDate.date.toDateString() ===
                        date.toDateString() &&
                      availableDate.available === "false" &&
                      availableDate.date > new Date()
                  )
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {availableDates.filter((date) => date.available == "false").length >
          0 ? (
            <FormDescription>
              Pick the date for your appointment.
            </FormDescription>
          ) : (
            <FormDescription className="text-red-500">
              There are no available dates. Please try again later.
            </FormDescription>
          )}
          <FormMessage />
          <Select
            onValueChange={(value) => {
              const selectedDateItem = availableDates.find(
                (date) => date.date.toISOString() === value
              );
              form.setValue("date", new Date(value));
            }}
            defaultValue={field.value?.toString()}
          >
            <FormControl>
              {availableDates.filter(
                (date) =>
                  date.date?.toLocaleDateString() ===
                    selectedDate?.toLocaleDateString() && date.available
              ).length > 0 && (
                <SelectTrigger>
                  <SelectValue placeholder="Select time for the appointment" />
                </SelectTrigger>
              )}
            </FormControl>
            <SelectContent>
              {availableDates
                .filter(
                  (date) =>
                    date.date?.toLocaleDateString() ===
                      selectedDate?.toLocaleDateString() && date.available
                )
                .map((date) => (
                  <SelectItem
                    value={date.date.toISOString()}
                    key={date.date.toISOString()}
                  >
                    {date.date.toLocaleString("en-GB")}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
