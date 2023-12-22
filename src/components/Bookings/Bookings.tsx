// Bookings.tsx
import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Alert,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BookingsReadOnlyRow from "./BookingsReadOnlyRow";
import { TablePagination } from "@mui/material";
import axios from 'axios';
import { Box } from "@mui/system";


interface CustomTablePaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
    ) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  function CustomTablePagination(props: CustomTablePaginationProps) {
    const { count, page, rowsPerPage, onPageChange, onRowsPerPageChange } = props;
    
    const handleBackButtonClick = () => {
      onPageChange(null, page - 1);
    };
    
    const handleNextButtonClick = () => {
      onPageChange(null, page + 1);
    };
    
    return (
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
      <TablePagination
      component="div"
      {...props}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      showFirstButton={true}
      showLastButton={true}
      backIconButtonProps={{
        onClick: handleBackButtonClick,
        disabled: page === 0,
      }}
      nextIconButtonProps={{
        onClick: handleNextButtonClick,
        disabled: page >= Math.ceil(count / rowsPerPage) - 1,
      }}
      />
      </Box>
      );
    }
    
    
    function Bookings() {
      const [showAlert, setShowAlert] = useState(false);
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(5);
      const [bookings, setBookings] = useState([]);
      const [bookingCount, setBookingCount] = useState(0);
      const [filters, setFilters] = useState({
        user: "",
        date: "",
        tableNumber: "",
      });
      
  
      
      useEffect(() => {
        const token = `Bearer ${localStorage.getItem("currentUser")}`;
        
        axios.get('https://localhost:7290/api/Reservation',{
        headers: {
          "Authorization": token,
        },
      })
      .then(response => {
        const data = response.data;
        // Apply frontend filtering based on user, date, and table number
        const filteredData = data.filter(booking =>
          booking?.user?.toLowerCase().includes(filters.user.toLowerCase()) &&
          (!filters.date || booking.day === filters.date) &&
          booking.tableNo.toString().includes(filters.tableNumber)
          );
          
          // Adjust the state variables and data as needed
          setBookings(filteredData);
          setBookingCount(filteredData.length);
          
        })
        .catch(error => {
          console.error('Error fetching data from backend:', error);
        });
      }, [page, rowsPerPage, filters,bookings]);
      
      
      const handleDateFilterChange = (date: Date | null | any) => {
        let dateString;
        
        if (date instanceof Date && !isNaN(date as any)) {
          const year = date.getFullYear();
          const month = `${date.getMonth() + 1}`.padStart(2, "0");
          const day = `${date.getDate()}`.padStart(2, "0");
          dateString = `${year}-${month}-${day}`;
        } else if (date?.$d instanceof Date) {
          // Handle Dayjs object
          const dayjsDate = date.$d;
          const year = dayjsDate.getFullYear();
          const month = `${dayjsDate.getMonth() + 1}`.padStart(2, "0");
          const day = `${dayjsDate.getDate()}`.padStart(2, "0");
          dateString = `${year}-${month}-${day}`;
        } else {
          console.error("Invalid date:", date);
          // Handle the case when the provided date is null or invalid
          setFilters((prevFilters) => ({
            ...prevFilters,
            date: "",
          }));
          return;
        }
        
        setFilters((prevFilters) => ({
          ...prevFilters,
          date: dateString,
        }));
      };
      
      
      const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
        ) => {
          setPage(newPage);
        };
        
        const handleChangeRowsPerPage = (
          event: React.ChangeEvent<HTMLInputElement>
          ) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          };
          
          const handleUserFilterChange = (
            event: React.ChangeEvent<HTMLInputElement>
            ) => {
              setFilters((prevFilters) => ({
                ...prevFilters,
                user: event.target.value,
              }));
            };
            
            
            
            const handleTableNumberFilterChange = (
              event: React.ChangeEvent<HTMLInputElement>
              ) => {
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  tableNumber: event.target.value,
                }));
              };
              
              
              
              const handleUnbook = (reservationId: number) => {
                const token = `Bearer ${localStorage.getItem("currentUser")}`;
                // Complete the handleUnbook function using axios.delete
                axios
                  .delete(`https://localhost:7290/api/reservation/${reservationId}`, {
                    headers: {
                      Authorization: token,
                    },
                  })
                  .then((response) => {
                    // Handle success, e.g., refresh bookings or update state
                    alert("Booking unbooked successfully");
                    // You may want to refresh the bookings after unbooking
                    // For example, you can fetch the updated bookings from the server
                    // and update the state setUserBookings(newBookings);
                  })
                  .catch((error) => {
                    // Handle error
                    alert("Error unbooking:", error);
                  });
                  };
                  
                  const cellStyle: React.CSSProperties = {
                    fontSize: "20px",
                    backgroundColor: "#ffba08",
                    color: "#2b2b2b",
                    borderRight: "solid 1px #2b2b2b",
                    textAlign: "center",
                  };
                  
                  return (
                    <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      margin: "10% 2% 10% 2%",
                      width: "97%",
                    }}
                    >
                    {showAlert && (
                      <Alert
                      severity="success"
                      onClose={() => setShowAlert(false)}
                      sx={{ marginBottom: "1rem" }}
                      >
                      Unbooking Successful!
                      </Alert>
                      )}
                      <Typography
                      variant="h1"
                      style={{
                        marginBottom: "2rem",
                        width: "30%",
                        fontSize: "2.6rem",
                      }}
                      >
                      Reservations
                      </Typography>
                      
                      <form style={{ marginBottom: "2rem", display: "flex" }}>
                      <TextField
                      label="User"
                      onChange={handleUserFilterChange}
                      style={{ marginRight: "1rem" }}
                      />
                      <TextField
                      label="Table Number"
                      onChange={handleTableNumberFilterChange}
                      style={{ marginRight: "1rem" }}
                      />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker label="Date" onChange={handleDateFilterChange} />
                      </LocalizationProvider>
                      </form>
                      
                      <Table style={{ tableLayout: "auto" }}>
                      <TableHead>
                      <TableRow>
                      <TableCell style={cellStyle}>User</TableCell>
                      <TableCell style={cellStyle}>Reservation Code</TableCell>
                      <TableCell style={cellStyle}>Table Number</TableCell>
                      <TableCell style={cellStyle}>Date</TableCell>
                      <TableCell style={cellStyle}>Start Time</TableCell>
                      <TableCell style={cellStyle}>End Time</TableCell>
                      <TableCell
                      style={{
                        fontSize: "20px",
                        backgroundColor: "#ffba08",
                        color: "#2b2b2b",
                        textAlign: "center",
                        borderTopRightRadius: "10px",
                      }}
                      >
                      Action
                      </TableCell>
                      </TableRow>
                      </TableHead>
                      
                      
                      <TableBody>
                      {bookings?.length > 0 ? (
                        bookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((booking) => (
                          <BookingsReadOnlyRow
                          key={booking.reservationId}
                          booking={booking}
                          onUnbook={handleUnbook}
                          />
                          ))
                          ) : (
                            <TableRow>
                            <TableCell colSpan={7} style={{ textAlign: "center" }}>
                            No bookings found
                            </TableCell>
                            </TableRow>
                            )}
                            </TableBody>
                            </Table>
                            
                            {bookingCount > 0 ? (
                              <CustomTablePagination
                              rowsPerPageOptions={[5, 10, 25]}
                              count={bookingCount}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onPageChange={handleChangePage}
                              onRowsPerPageChange={handleChangeRowsPerPage}
                              />
                              ) : null}
                              </div>
                              );
                            }
                            
                            export default Bookings;
                            