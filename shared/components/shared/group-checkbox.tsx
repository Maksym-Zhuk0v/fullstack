import React from "react";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { TCalendarWithAppointment } from "./modals/form/schemas";
import { typeOfDamage } from "@/shared/constants/type-of-damage";

interface GroupCheckbox {
  form: UseFormReturn<TCalendarWithAppointment>;
}

const GroupCheckbox = ({ form }: GroupCheckbox) => {
  return (
    <div className="flex flex-col gap-2">
      {typeOfDamage.map((item) => (
        <FormField
          key={item.id}
          control={form.control}
          name="appointment.typeOfDamage"
          render={({ field }) => {
            const checkboxId = `checkbox-${item.id}`;
            const handleCheckedChange = (checked: boolean) => {
              const currentValues = field.value || [];
              const updatedValues = checked
                ? [...currentValues, item.id]
                : currentValues.filter((id: string) => id !== item.id);
              field.onChange(updatedValues);
            };

            return (
              <FormItem
                key={item.id}
                className="flex flex-row items-center space-x-3 space-y-0"
              >
                <FormControl>
                  <Checkbox
                    className="rounded-[6px] w-6 h-6"
                    id={checkboxId}
                    checked={field.value?.includes(item.id)}
                    onCheckedChange={handleCheckedChange}
                  />
                </FormControl>
                <FormLabel
                  htmlFor={checkboxId}
                  className="font-normal cursor-pointer"
                >
                  {item.label}
                </FormLabel>
              </FormItem>
            );
          }}
        />
      ))}
    </div>
  );
};

export default GroupCheckbox;
