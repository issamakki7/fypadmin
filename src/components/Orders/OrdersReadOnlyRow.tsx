import { TableRow, TableCell, Button } from "@mui/material";
import "./Orders.css";


interface OrdersReadOnlyRowProps {
  order: Order;
  onSendOrder: () => void; // Adjust the type according to your requirements
}

const OrdersReadOnlyRow: React.FC<OrdersReadOnlyRowProps> = ({ order, onSendOrder }) => {

  const handleSendOrder = () => {
    onSendOrder(order.order_id,order.table_number);
  };


  return (
    <TableRow>
      <TableCell
        style={{
          textAlign: "center",
        }}
      >
        {order.tableNo}
      </TableCell>
      <TableCell
        style={{
          textAlign: "center",
        }}
      >
        {order.orderId}
      </TableCell>
      <TableCell
        style={{
          textAlign: "center",
        }}
      >
        {order.orders}
      </TableCell>
      <TableCell
        style={{
          textAlign: "center",
        }}
      >
        <button className="my-bookings-button" onClick={handleSendOrder}>
          Send Order
        </button>
        
      </TableCell>
    </TableRow>
  );
};

export default OrdersReadOnlyRow;
