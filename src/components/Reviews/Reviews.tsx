import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Alert,
} from "@mui/material";
import { TablePagination } from "@mui/material";
import TextField from "@mui/material/TextField";
import ReviewsReadOnlyRow from "./ReviewsReadOnlyRow";

interface CustomTablePaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
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
  );
}

function Reviews() {
  const [showAlert, setShowAlert] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [reviews, setReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [filterReservationId, setFilterReservationId] = useState("");
  const [filterCustomerName, setFilterCustomerName] = useState("");
  const [filterFoodQuality, setFilterFoodQuality] = useState("");
  const [filterCustomerService, setFilterCustomerService] = useState("");
  const [filterAtmosphere, setFilterAtmosphere] = useState("");
  const [filterContent, setFilterContent] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);

  const fetchData = () => {
    const token = `Bearer ${localStorage.getItem("currentUser")}`;

    axios
      .get("https://localhost:7290/api/Reservation/Reviews",{
        headers: {
          "Authorization": token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setReviews(response.data);
        setFilteredBookings(response.data);
        setReviewCount(response.data.length); // Total count of reviews
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage,reviews]);

  useEffect(() => {
    const filtered = reviews.filter((review) =>
      String(review.reservationId).includes(filterReservationId) &&
      review.customerName.toLowerCase().includes(filterCustomerName.toLowerCase()) &&
      String(review.foodQualityRating).includes(filterFoodQuality) &&
      String(review.customerServiceRating).includes(filterCustomerService) &&
      String(review.restaurantAtmosphereRating).includes(filterAtmosphere) &&
      review.content.toLowerCase().includes(filterContent.toLowerCase())
    );
    setFilteredBookings(filtered);
    setReviewCount(filtered.length);
  }, [filterReservationId, filterCustomerName, filterFoodQuality, filterCustomerService, filterAtmosphere, filterContent, reviews]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
          textAlign: "center",
          marginBottom: "2rem",
          width: "10%",
          fontSize: "2.6rem",
        }}
      >
        Reviews
      </Typography>

      <div>
       
        <TextField
          sx={{marginRight:"1rem"}}
          label="Customer Name"
          value={filterCustomerName}
          onChange={(e) => setFilterCustomerName(e.target.value)}
        />
        <TextField
          sx={{marginRight:"1rem"}}
          label="Food Quality Rating"
          value={filterFoodQuality}
          onChange={(e) => setFilterFoodQuality(e.target.value)}
        />
        <TextField
          sx={{marginRight:"1rem"}}
          label="Customer Service Rating"
          value={filterCustomerService}
          onChange={(e) => setFilterCustomerService(e.target.value)}
        />
        <TextField
          sx={{marginRight:"1rem"}}
          label="Restaurant Atmosphere Rating"
          value={filterAtmosphere}
          onChange={(e) => setFilterAtmosphere(e.target.value)}
        />
        <TextField
          sx={{marginRight:"1rem"}}
          label="Content"
          value={filterContent}
          onChange={(e) => setFilterContent(e.target.value)}
        />
      </div>

      <Table style={{ tableLayout: "auto" }}>
        <TableHead>
          <TableRow>
            <TableCell style={cellStyle}>Customer Name</TableCell>
            <TableCell style={cellStyle}>Food Quality Rating</TableCell>
            <TableCell style={cellStyle}>Customer Service Rating</TableCell>
            <TableCell style={cellStyle}>Restaurant Atmosphere Rating</TableCell>
            <TableCell style={cellStyle}>Content</TableCell>
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
          {filteredBookings?.length > 0 ? (
            filteredBookings
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((review) => (
                <ReviewsReadOnlyRow key={review?.reviewId} review={review} />
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} style={{ textAlign: "center" }}>
                No reviews found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {reviewCount > 0 ? (
        <CustomTablePagination
          rowsPerPageOptions={[5, 10, 25]}
          count={reviewCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : null}
    </div>
  );
}

export default Reviews;
