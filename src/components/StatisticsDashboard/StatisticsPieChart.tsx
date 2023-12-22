import React from "react";
import { PieChart, Pie, Cell, Label, Tooltip, Legend } from "recharts";
import { Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";

const StatisticsPieChart = ({ data }) => {
  if (!data || !data.timeSlotBookings || data.timeSlotBookings.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            No booking data available
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const timeSlotColors = data.timeSlotBookings.map(
    (_, index) => `#${Math.floor(Math.random() * 16777215).toString(16)}`
  );

  // Filter out timeslots with zero bookings
  const filteredData = data.timeSlotBookings.filter(
    (timeslot) => timeslot.totalNumberOfBookings > 0
  );

  return (
    <Card>
      <CardContent>
        <Typography sx={{textAlign:"center"}} variant="h5" gutterBottom>
          Bookings Per Timeslot (All Time)
        </Typography>
        <PieChart width={600} height={400}>
          <Pie
            data={filteredData}
            dataKey="totalNumberOfBookings"
            nameKey="timeslotId"
            cx={window.innerWidth < 600 ? 210 : 300}
            cy={180}
            outerRadius={100}
            labelLine={false}
          >
            {filteredData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={timeSlotColors[index]}
              />
            ))}
            <Label
              position="insideBottom"
              fill="#fff"
              fontSize={12}
              fontWeight="bold"
              offset={0}
            />
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} reservations`, `Timeslot ${name}`]}
          />
          <Legend formatter={(value) => `Timeslot ${value}`} />
        </PieChart>
      </CardContent>
    </Card>
  );
};

StatisticsPieChart.propTypes = {
  data: PropTypes.object,
};

export default StatisticsPieChart;
