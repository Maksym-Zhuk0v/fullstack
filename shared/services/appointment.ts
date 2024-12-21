import { axiosInstance } from "./instance";

export type IAppointment = {
  fullName: string;
  email: string;
  typeOfDamage: string[];
  dateTime: Date;
};

export const create = async (body: IAppointment) => {
  return await axiosInstance.post<any>("/appointment", body);
};

export const cencel = async (id: number): Promise<any> => {
  return (await axiosInstance.delete<any>("/appointment/" + id)).data;
};
