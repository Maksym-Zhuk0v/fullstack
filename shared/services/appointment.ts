import { axiosInstance } from "./instance";

export const create = async (body: any) => {
  return await axiosInstance.post<any>("/appointment", body);
};

export const cencel = async (id: number): Promise<any> => {
  return (await axiosInstance.delete<any>("/appointment/" + id)).data;
};
