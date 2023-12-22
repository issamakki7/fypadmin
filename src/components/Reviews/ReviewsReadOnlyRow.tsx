import React from "react";
import { TableRow, TableCell, Button } from "@mui/material";
import { Review } from "../../models/IReview.model";

interface Props {
  review: Review;
}

const ReviewsReadOnlyRow: React.FC<Props> = ({ review }) => {
  return (
    <TableRow>
      <TableCell style={{ textAlign: "center" }}>{review.customerName}</TableCell>
      <TableCell style={{ textAlign: "center" }}>{review.foodQualityRating}</TableCell>
      <TableCell style={{ textAlign: "center" }}>{review.customerServiceRating}</TableCell>
      <TableCell style={{ textAlign: "center" }}>{review.restaurantAtmosphereRating}</TableCell>
      <TableCell style={{ textAlign: "center" }}>{review.content}</TableCell>
      <TableCell style={{ textAlign: "center" }}>
        <a href={`mailto:${review.customerEmail}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Contact
          </Button>
        </a>
      </TableCell>
    </TableRow>
  );
};

export default ReviewsReadOnlyRow;
  