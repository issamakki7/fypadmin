import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
  Container,
  TextField,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import OrdersReadOnlyRow from "./OrdersReadOnlyRow";
import axios from "axios";

import "./Orders.css";

function Orders() {
  const [userOrders, setUserOrders] = useState([]);
  const [tableNumberFilter, setTableNumberFilter] = useState(0);
  const [orderIdFilter, setOrderIdFilter] = useState("");
  const [orderFilter, setOrderFilter] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [sortedColumn, setSortedColumn] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Set the number of rows per page here

  useEffect(() => {
    const token = `Bearer ${localStorage.getItem("currentUser")}`;

    axios
      .get("https://localhost:7290/api/Reservation/ActiveOrders", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setUserOrders(response.data);
        setFilteredBookings(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from backend:", error);
      });
  }, [userOrders]);

  const handleSendOrder = (booking_id: number,table_number:number) => {
    const token = `Bearer ${localStorage.getItem("currentUser")}`;
    axios.post(`https://localhost:7290/Reservation/SendDish/${table_number}`,{
      headers: {
        "Authorization": token,
      },
    })
      .then(response => {
        console.log('Server Response:', response.data);
      })
      .catch(error => {
        console.log(`https://localhost:7290/Reservation/SendDish/${table_number}`)
        console.error('Error sending POST request:', error);
        // Check the error response for more details
        if (error.response) {
          console.error('Server Error Response:', error.response.data);
        }
      });
      
  };

  const handleTableNumberFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTableNumberFilter(Number(event.target.value));
  };

  const handleOrderIdFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOrderIdFilter(event.target.value);
  };

  const handleOrderFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOrderFilter(event.target.value);
  };

  const handleSortColumn = (column: string) => {
    if (sortedColumn === column) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortedColumn(column);
      setSortOrder("asc");
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Apply filters and sorting
  useEffect(() => {
    let filteredOrders = userOrders.filter((order) => {
      const tableNumberMatch =
        tableNumberFilter === 0 || order.tableNo === tableNumberFilter;
  
      const orderIdMatch = order.orderId.toString().includes(orderIdFilter);
  
      // Case-insensitive filtering for orders
      const orderMatch = order.orders.toLowerCase().includes(orderFilter.toLowerCase());
  
      return tableNumberMatch && orderIdMatch && orderMatch;
    });
  
    // Sorting
    if (sortedColumn) {
      filteredOrders = filteredOrders.sort((a, b) => {
        const aValue = a[sortedColumn as keyof typeof a];
        const bValue = b[sortedColumn as keyof typeof b];
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }
  
    setFilteredBookings(filteredOrders);
  }, [userOrders, tableNumberFilter, orderIdFilter, orderFilter, sortedColumn, sortOrder]);

  return (
    <Container style={{ marginTop: "8rem" }}>
      <Typography className="bookings-title" variant="h3">
        Active Orders
      </Typography>

      <form style={{ marginBottom: "0rem", display: "flex" }}>
        <TextField
          label="Table Number"
          value={tableNumberFilter}
          onChange={handleTableNumberFilterChange}
          style={{ marginTop: "1.5rem", marginRight: "1rem" }}
        />

        <TextField
          label="Order ID"
          value={orderIdFilter}
          onChange={handleOrderIdFilterChange}
          style={{ marginTop: "1.5rem", marginRight: "1rem" }}
        />

        <TextField
          label="Order"
          value={orderFilter}
          onChange={handleOrderFilterChange}
          style={{ marginTop: "1.5rem", marginRight: "1rem" }}
        />
      </form>

      <Table style={{ margin: "2rem 0rem", textAlign: "center" }}>
      <TableHead>
          <TableRow>
            <TableCell
              style={{
                fontSize: "20px",
                backgroundColor: "#ffba08",
                color: "#2b2b2b",
                borderRight: "solid 1px black",
                textAlign: "center",
                fontWeight: "550",
              }}
            >
              <TableSortLabel
                active={sortedColumn === "booking_id"}
                direction={sortOrder}
                onClick={() => handleSortColumn("booking_id")}
              >
                Table Number
              </TableSortLabel>
            </TableCell>
            <TableCell
              style={{
                fontSize: "20px",
                backgroundColor: "#ffba08",
                color: "#2b2b2b",
                borderRight: "solid 1px black",
                textAlign: "center",
                fontWeight: "550",
              }}
            >
              <TableSortLabel
                active={sortedColumn === "table_number"}
                direction={sortOrder}
                onClick={() => handleSortColumn("table_number")}
              >
                Order ID
              </TableSortLabel>
            </TableCell>

            <TableCell
              style={{
                fontSize: "20px",
                backgroundColor: "#ffba08",
                color: "#2b2b2b",
                borderRight: "solid 1px black",
                textAlign: "center",
                fontWeight: "550",
              }}
            >
              <TableSortLabel
                active={sortedColumn === "date"}
                direction={sortOrder}
                onClick={() => handleSortColumn("date")}
              >
                Order
              </TableSortLabel>
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
                borderRight: "solid 1px black",
                fontSize: "20px",
                backgroundColor: "#ffba08",
                color: "#2b2b2b",
                fontWeight: "550",
              }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredBookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
            <OrdersReadOnlyRow
              key={order.orderId}
              order={order}
              onSendOrder={handleSendOrder}
            />
          ))}
        </TableBody>
      
      </Table>


      {/* Pagination */}
      <TablePagination
        sx={{marginBottom:"2rem"}}
        component="div"
        count={filteredBookings?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    
    </Container>
  );
}

export default Orders;
