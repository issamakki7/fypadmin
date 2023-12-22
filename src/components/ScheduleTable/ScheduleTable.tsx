import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Grid,
  DialogActions,
  Box,
  Typography,
} from "@mui/material";
import { Calendar, DateObject } from "react-multi-date-picker";
import dayjs from "dayjs";
import axios from "axios";

export interface TimeSlot {
  id: number;
  startTime: string;
  endTime: string;
  isOccupiedSlot: boolean;
}

export interface ScheduleMeetingDialogProps {
  open: boolean;
  onClose: () => void;
  tableLabel: string;
  onSubmit: (selectedDates: DateObject, selectedTime: string | null) => void;
}

const ScheduleTable: React.FC<ScheduleMeetingDialogProps> = ({
  open,
  onClose,
  onSubmit,
  tableLabel,
}) => {
  const [selectedDates, setSelectedDates] = useState<DateObject>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [timeslots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [chosenTimeSlotId, setChosenTimeSlotId] = useState<number | null>(null);
  const [chosenDay, setChosenDay] = useState<number | null>(null);
  const [chosenMonth, setChosenMonth] = useState<number | null>(null);
  const [chosenYear, setChosenYear] = useState<number>(dayjs().year());

  const formatTime = (time: string) => dayjs(time, "HH:mm:ss").format("hA");

  const handleDateChange = (value: DateObject) => {
    setSelectedDates(value);

    if (value) {
      const date = dayjs(value[0]);
      handleGetTimeSlots(date.date(), date.month() + 1, date.year());
      setChosenDay(value.day);
      setChosenMonth(date.month() + 1);
      setChosenYear(date.year());
      setChosenTimeSlotId(null);
    }
  };

  const handleTimeSelection = (timeSlotId: number) => {
    const selectedSlot = timeslots.find((slot) => slot.id === timeSlotId);
    setSelectedTime(selectedSlot?.startTime || null);
    setChosenTimeSlotId(timeSlotId);
  };

  const handleGetTimeSlots = (day: number, month: number, year: number) => {
    if (!day || !month || !year) return;

    const token = `Bearer ${localStorage.getItem("currentUser")}`;
    const endpoint = `https://localhost:7290/api/Reservation/TimeSlots?TableId=${tableLabel}&Day=${day}&Month=${month}&Year=${year}`;

    axios
      .get(endpoint, { headers: { Authorization: token } })
      .then((response) => {
        setTimeSlots(response.data);
      })
      .catch((error) => {
        console.error("Error fetching timeslots:", error);
      });
  };

  const handleConfirmReservation = () => {
    const token = `Bearer ${localStorage.getItem("currentUser")}`;

    if (chosenDay && chosenMonth && chosenYear && chosenTimeSlotId) {
      const endpoint = "https://localhost:7290/api/Reservation";
      const reservationData = {
        day: chosenDay,
        month: chosenMonth,
        year: chosenYear,
        tableId: tableLabel,
        timeslotId: chosenTimeSlotId,
      };

      axios
        .post(endpoint, reservationData, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          alert(`Reservation Confirmed!, Reservation Code: ${response.data.reservationCode}`);
        })
        .catch((error) => {
          console.error("Error confirming reservation:", error);
        });

      onSubmit(selectedDates, selectedTime);
      onClose();
      setConfirmDialogOpen(false);
    } else {
      console.error("Cannot confirm reservation. Some values are missing.");
    }
  };

  const handleSubmit = () => {
    if (!selectedDates || !selectedTime) {
      window.alert("Please select both date and time.");
    } else {
      const chosenSlot = timeslots.find((slot) => slot.id === chosenTimeSlotId);
      if (chosenSlot && !chosenSlot.isOccupiedSlot) {
        setConfirmDialogOpen(true);
      } else {
        alert("Booking already taken or invalid time slot.");
      }
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle sx={{ backgroundColor: "#ffba08", color: "black", fontWeight: "bolder" }}>
          Choose Booking Date & Time
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={1} sx={{ paddingTop: "0" }}>
            <Grid item xs={12}>
              <Box
                mt={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <label style={{ marginBottom: "8px", fontWeight: 600, fontSize: "1.2rem" }}>
                  Select Date
                </label>
                <Calendar
                  highlightToday={false}
                  minDate={new Date()}
                  numberOfMonths={1}
                  disableMonthPicker={true}
                  disableYearPicker
                  buttons={false}
                  value={selectedDates}
                  onChange={handleDateChange}
                />

                {timeslots.length === 0 && (
                  <Typography variant="body1" sx={{ marginTop: 2 }}>
                    No time slots available for the selected date.
                  </Typography>
                )}

                <Typography variant="h6" sx={{ margin: "1rem 0 0 0", fontWeight: "bolder" }}>
                  Select Time Slot
                </Typography>

                <Box
                  mt={2}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {timeslots.map((slot) => (
                    <Button
                      key={slot.id}
                      sx={{ marginRight: "1rem" }}
                      variant={selectedTime === slot.startTime ? "contained" : "outlined"}
                      onClick={() => handleTimeSelection(slot.id)}
                    >
                      {`${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`}
                    </Button>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              bgcolor: "#ffba08",
              color: "#2b2b2b",
              "&:hover": {
                transition: "all 0.3s ease-out",
                backgroundColor: "#ffba0f",
                color: "#f5f0f8",
              },
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>Confirm Reservation</DialogTitle>
        <DialogContent>
          <Box>
            <Typography variant="body1">
              This table is available for reservation. Are you sure
              you want to proceed with the reservation?
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirmReservation}
            variant="contained"
            sx={{
              bgcolor: "#ffba08",
              color: "#f5f0f8",
              "&:hover": {
                transition: "all 0.3s ease-out",
                backgroundColor: "#4894c1",
                color: "#f5f0f8",
              },
            }}
          >
            Confirm
          </Button>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ScheduleTable;
