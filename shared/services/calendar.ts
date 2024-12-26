import { Calendar } from "@prisma/client";
import { axiosInstance } from "./instance";

export type ICalendar = Calendar & {
  items: { id: number; available: string; date: Date }[];
};

export type TEditCalendarBody = {
  date: Date;
  available: string;
  appointment: {
    id?: number | undefined;
    fullName?: string | undefined;
    email?: string | undefined;
    typeOfDamage?: string[] | undefined;
  } | null;
  appointmentId?: number | undefined;
};

export const getAll = async () => {
  const { data } = await axiosInstance.get<ICalendar[]>("/calendar");
  return data;
};

export const edit = async (id: number, body: TEditCalendarBody) => {
  return (await axiosInstance.put<any>("/calendar/" + id, body)).data;
};

export const putWithEmail = async () => {
  return (await axiosInstance.put<any>("/calendar")).data;
};

export const deleteMultiple = async (id: number[]) => {
  return (await axiosInstance.delete<any>("/calendar", { data: id })).data;
};

export const create = async (body: TEditCalendarBody) => {
  return (await axiosInstance.post<any>("/calendar", body)).data;
};

export const getOne = async (id: number) => {
  const { data } = await axiosInstance.get<any>("/calendar/" + id);
  return data;
};
