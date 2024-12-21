import { axiosInstance } from "./instance";

export const verify = async (code: string) => {
  return (await axiosInstance.get<any>("/auth/verify?code=" + code)).data;
};

export const update = async (body: any) => {
  return (await axiosInstance.put<any>("/user", body)).data;
};
