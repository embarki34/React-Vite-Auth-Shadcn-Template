import { baseUrl } from "@/const/const";
import axiosInstance from "@/const/axiosInstence";
import { Stats } from "@/types";
    

export const getStates = async (): Promise<Stats> => {
  const response = await axiosInstance.get(`${baseUrl}/states`);
  return response.data;
};
