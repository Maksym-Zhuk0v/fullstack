"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import {
  createCalendarSchema,
  TCreateCalendarValues,
} from "./modals/form/schemas";
import { useForm } from "react-hook-form";
import { cn } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Api } from "@/shared/services/api-client";

interface Props {
  availableDates: { id: number; available: string; date: Date }[];
}

const CreateCalendarForm = ({ availableDates }: Props) => {
  const [selectedDate, setDate] = React.useState<Date | undefined>(new Date());

  const form = useForm<TCreateCalendarValues>({
    resolver: zodResolver(createCalendarSchema),
    defaultValues: {
      date: undefined,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await Api.calendar.create(data);
      toast.success("Calendar updated");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const isDateAvailable = (date: Date) => {
    if (
      availableDates.filter((date) => date.available === "false").length === 0
    )
      return date;
    return availableDates.some(
      (availableDate) => availableDate.available == "false"
    );
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-xl">
                  Create new appointments.
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {selectedDate !== undefined ? (
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
                      onSelect={(value) => setDate(value)}
                      disabled={(date) => date <= new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Select a date for the appointment
                </FormDescription>
                <FormMessage />
                {selectedDate !== undefined && (
                  <Select
                    onValueChange={(value) => field.onChange(new Date(value))}
                    defaultValue={field.value?.toLocaleDateString("en-GB")}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time for the appointment" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, index) => {
                        const date = new Date(selectedDate);
                        date.setHours(9 + index, 0, 0, 0);
                        return date;
                      })
                        .filter((date) => isDateAvailable(date))
                        .map((date) => (
                          <SelectItem
                            value={date.toISOString()}
                            key={date.toLocaleString()}
                          >
                            {date.toLocaleString("en-GB")}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              </FormItem>
            )}
          />
          <Button type="submit">Create</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCalendarForm;
