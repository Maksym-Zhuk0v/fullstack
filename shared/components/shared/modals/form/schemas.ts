import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(4, { message: "Enter correct password" });

export const typeOfDamageSchema = z
  .array(z.string())
  .refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  });

export const emailSchema = z.string().email({ message: "Enter a valid email" });

export const dateSchema = z.date({
  required_error: "Please select a valid date",
  invalid_type_error: "Invalid date type",
});

export const fullNameSchema = z
  .string()
  .min(2, { message: "Enter your full name" });

export const formLoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: fullNameSchema,
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password are not equal",
    path: ["confirmPassword"],
  });

export const calendarWithAppointmentSchema = z.object({
  date: dateSchema || null,
  available: z
    .string()
    .nonempty({ message: "Availability status is required" }),
  appointment: z
    .object({
      id: z.number().optional(),
      fullName: fullNameSchema.optional(),
      email: emailSchema.optional(),
      typeOfDamage: typeOfDamageSchema.optional(),
    })
    .nullable(),
  appointmentId: z.number().optional(),
});

export const createCalendarSchema = z.object({
  date: dateSchema,
});

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
export type TCalendarWithAppointment = z.infer<
  typeof calendarWithAppointmentSchema
>;
export type TCreateCalendarValues = z.infer<typeof createCalendarSchema>;
