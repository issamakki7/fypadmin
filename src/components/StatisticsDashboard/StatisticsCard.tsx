import { Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";

const StatisticsCard = ({ icon, value, description, backgroundColor }) => {
  return (
    <Card
      style={{
        backgroundColor: backgroundColor || "#d1e9fc", // Use the provided prop or a default color
        borderRadius: "1.4rem",
        padding: "2rem",
        height: "100%",
        marginBottom: "3rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        {icon}
        <Typography style={{ fontWeight: "800" }} variant="h4" gutterBottom>
          {value}
        </Typography>
        <Typography
          style={{ fontSize: "1rem" }}
          color="textSecondary"
          variant="h6"
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

StatisticsCard.propTypes = {
  icon: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string, // New prop for background color
};

export default StatisticsCard;
