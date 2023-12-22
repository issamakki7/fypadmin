import { StatisticsProps } from "../models/IStatistics.model";
import axiosInstance from "../utils/axiosConfig";

const getAllTimeAverageAttendance = async (): Promise<number> => {
  return axiosInstance.get(`/statistics/average-attendees`);
};

const getAllTimeFloorAverageAttendance = async (
  floor_id: string
): Promise<string> => {
  return axiosInstance.get(`/statistics/average-attendees/${floor_id}`);
};

const getTableWithLeastBookings = async (): Promise<StatisticsProps[]> => {
  return axiosInstance.get(`/statistics/least-reservation-table`);
};

const getAllWeeklyReservations = async (): Promise<StatisticsProps[]> => {
  return axiosInstance.get(`/statistics/this-week`);
};

const getTodaySeatAvailability = async (
  timestamp: number
): Promise<StatisticsProps[]> => {
  return axiosInstance.get(`/statistics/seats-status/${timestamp}`);
};

const getAllMonthlyReservations = async (): Promise<StatisticsProps[]> => {
  return axiosInstance.get(`/statistics/this-month`);
};

const getFloorWeeklyReservations = async (
  floor_id: string
): Promise<StatisticsProps[]> => {
  return axiosInstance.get(`/statistics/this-week/${floor_id}`);
};

export const statisticsService = {
  getAllTimeAverageAttendance,
  getTableWithLeastBookings,
  getAllTimeFloorAverageAttendance,
  getAllWeeklyReservations,
  getAllMonthlyReservations,
  getTodaySeatAvailability,
  getFloorWeeklyReservations,
};
