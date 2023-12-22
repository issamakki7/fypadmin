import { Booking } from "../models/IBooking.model";
import axiosInstance from "../utils/axiosConfig";

const getBookings = async (): Promise<Booking[]> => {
  const userId = "issa";
  return axiosInstance.get(`/reservation/by-user/${userId}`);
};

const deleteBooking = async (reservationId: string): Promise<Booking> => {
  return axiosInstance.delete(`/reservation/${reservationId}`);
};

const getAdminBookings = async (
  filters: Record<string, any>
): Promise<Booking[]> => {
  return axiosInstance.get(`/reservation`, { params: filters });
};

export const bookingService = {
  getBookings,
  deleteBooking,
  getAdminBookings,
};
