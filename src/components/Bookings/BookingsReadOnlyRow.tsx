// BookingsReadOnlyRow.tsx
import React from "react";
import { TableRow, TableCell, Button } from "@mui/material";

interface Props {
  booking: {
    reservationId: number;
    user: string;
    tableNo: number;
    reservationCode: string;
    day: string;
    startTime: string;
    endTime: string;
  };
  onUnbook: (reservationId: number) => void;
}

const BookingsReadOnlyRow: React.FC<Props> = ({ booking, onUnbook }) => {
  function formatDate(date: string) {
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = newDate.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  function formatTime(timeString: string) {
    const [hours, minutes, seconds] = timeString.split(":");
    const formattedTime = `${parseInt(hours, 10) % 12 || 12}:${minutes || "00"} ${
      parseInt(hours, 10) >= 12 ? "PM" : "AM"
    }`;
  
    return formattedTime;
  }

  const handleUnbook = () => {
    onUnbook(booking.reservationId);
  };

  return (
    <TableRow>
      <TableCell style={{ textAlign: "center" }}>{booking.user}</TableCell>
      <TableCell style={{ textAlign: "center" }}>{booking.reservationCode}</TableCell>
      <TableCell style={{ textAlign: "center" }}>{booking.tableNo}</TableCell>
      <TableCell style={{ textAlign: "center" }}>{formatDate(booking.day)}</TableCell>
      <TableCell style={{ textAlign: "center" }}>{formatTime(booking.startTime)}</TableCell>
      <TableCell style={{ textAlign: "center" }}>{formatTime(booking.endTime)}</TableCell>
      <TableCell style={{ textAlign: "center" }}>
        <Button variant="contained" color="primary" onClick={handleUnbook}>
          Unbook
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default BookingsReadOnlyRow;
