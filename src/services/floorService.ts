import { FloorProps } from "../models/IFloor.model";
import axiosInstance from "../utils/axiosConfig";

const getFloors = async (): Promise<FloorProps[]> => {
  return axiosInstance.get(`/floor`);
};
const getFloor = async (buildingId: string): Promise<FloorProps> => {
  return axiosInstance.get(`/floor/building/${buildingId}`);
};

const getFloorChart = async (floorId: string): Promise<string> => {
  return axiosInstance.get(`/key/chart/${floorId}`);
};
const getEventKey = async (floorId: string, date: string) => {
  return axiosInstance.get(`/key/floors/${floorId}/event?date=${date}`);
};
export const floorService = {
  getFloors,
  getFloor,
  getFloorChart,
  getEventKey,
};
