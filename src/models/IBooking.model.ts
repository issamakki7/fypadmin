import { SeatProps } from "./ISeat.model";

export interface Booking {
  user_id?: string;
  seat: SeatProps;
  table_number: number;
  reservation_id: string;
  start_date: string;
  end_date: string;
  reservationType: {
    id: number;
    description: string;
  };
  meetingRoom?: {
    meeting_room_id: string;
    floor: {
      floor_id: string;
      floor_number: string;
      building: {
        building_id: string;
        building_name: string;
        address: string;
      };
    };
    table_number: string;
  };
  status: boolean;
}
