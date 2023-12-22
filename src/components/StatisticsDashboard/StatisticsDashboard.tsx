import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import utcPlugin from "dayjs/plugin/utc";
import "dayjs/locale/en";
dayjs.extend(utcPlugin);

import { Typography, Grid, Divider, CardContent, Card } from "@mui/material";
import {
  AttachMoneyOutlined,
  TableBarOutlined,
  TrendingDownOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";

import { StatisticsProps } from "../../models/IStatistics.model";
import StatisticsCard from "./StatisticsCard";
import StatisticsPieChart from "./StatisticsPieChart";
import axios from 'axios';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const COLORS = ["#7f2c8e", "#4894c1"];


const StatisticsDashboard: React.FC = () => {
  const [monthlyRevenues, setMonthlyRevenues] = useState<
  string | undefined
>();
const [weeklyRevenues, setWeeklyRevenues] = useState<
string | undefined
>();

const [bookingPieChartData,setBookingPieChartData] = useState({});



  const [weeklyReservations, setWeeklyReservations] = useState<
    StatisticsProps[]
  >([]);

  const [dailyReservations, setDailyReservations] = useState<
  StatisticsProps[]
>([]);

  const [monthlyReservations, setMonthlyReservations] = useState<
    StatisticsProps[]
  >([]);
 
  const [leastBookedTableData, setLeastBookedTableData] = useState<any>();
  const [mostBookedTable, setMostBookedTable] = useState<any>();


  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const cardElement = document.getElementById("chart-card");
      if (cardElement) {
        const { width } = cardElement.getBoundingClientRect();
        setCardWidth(width);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const token = `Bearer ${localStorage.getItem("currentUser")}`;

     // Fetch Daily Reservations
     axios.get(`https://localhost:7290/api/Statistics/dailyreservations`,{
      headers: {
        "Authorization": token,
      },
    }).then((response) => {
      console.log(response.data)
      setDailyReservations(response.data);
    });


      // Fetch Weekly Reservations
      axios.get(`https://localhost:7290/api/Statistics/weeklyreservation/${(new Date().getMonth() )+ 1}`,{
        headers: {
          "Authorization": token,
        },
      }).then((response) => {
        setWeeklyReservations(response.data);
      });

         // Fetch Monthly Reservations
         axios.get(`https://localhost:7290/api/Statistics/monthreservation`,{
          headers: {
            "Authorization": token,
          },
        }).then((response) => {
          setMonthlyReservations(response.data);
        });

        //Fetch Pie Chart Data

        axios.get(`https://localhost:7290/api/Statistics/nbOfBookings`,{
          headers: {
            "Authorization": token,
          },
        }).then((response) => {
          setBookingPieChartData(response.data);
        });


      // Fetch Monthly Revenues
      axios.get(`https://localhost:7290/api/Statistics/revenues/Month`,{
        headers: {
          "Authorization": token,
        },
      }).then((response) => {
        setMonthlyRevenues(response.data.sumOfProfits);
      });

      // Fetch Weekly Revenues
      axios.get(`https://localhost:7290/api/Statistics/revenues/Week`,{
        headers: {
          "Authorization": token,
        },
      }).then((response) => {
        setWeeklyRevenues(response.data.sumOfProfits);
      });

    // Fetch least booked table
    axios.get(`https://localhost:7290/api/Statistics/leastbookedtable`,{
      headers: {
        "Authorization": token,
      },
    }).then((response) => {
      setLeastBookedTableData(response.data.tableNo);
    });

      // Fetch most booked table
    

      axios.get(`https://localhost:7290/api/Statistics/mostbookedtable`,{
        headers: {
          "Authorization": token,
        },
      }).then((response) => {
        setMostBookedTable(response.data.tableNo);
      });

   

  }, []);

  const renderCustomTooltip = (props, chartType) => {
    const { active, payload } = props;
  
    if (active && payload && payload.length) {
      const dataPoint = payload[0];
      let formattedDate;
  
      if (chartType === "daily") {
        formattedDate = dayjs(dataPoint.payload.day).format("MMM DD");
      } else if (chartType === "weekly") {
        formattedDate = dayjs(dataPoint.payload.week).format("MMM DD [Week]");
      } else if (chartType === "monthly") {
        formattedDate = dayjs(dataPoint.payload.day).format("MMM");
      }
  
      return (
        <div className="custom-tooltip">
          <p>{`Date: ${formattedDate}`}</p>
          <p>{`Reservations: ${dataPoint.payload.reservations}`}</p>
        </div>
      );
    }
  
    return null;
  };
  

  
  return (
    <div style={{ padding: "2rem", marginTop:"2rem" }}>
      
     
      <Divider style={{ marginBottom: "2rem" }} />
      <Grid container spacing={4}>
        {/* Cards */}

        <Grid style={{ marginTop: "2rem", textAlign:"center", }} item xs={12} sm={6} md={3}>
          <StatisticsCard
          backgroundColor= "#ffeb99"
            icon={
              <AttachMoneyOutlined
                style={{
                  marginBottom: "2rem",
                  color: "#000000",
                  backgroundColor: "#ffeb99",
                  borderRadius: "50%",
                  padding: "0.5rem",
                  boxShadow: "0 3px 10px rgba(0, 0, 0, 0.15)",
                  textAlign:"center",
                }}
                fontSize="large"
              />
            }
            description="Total Revenues (This Month)"
            value={`${monthlyRevenues} $`}
          />
        </Grid>

        <Grid style={{ marginTop: "2rem", textAlign:"center", }} item xs={12} sm={6} md={3}>
          <StatisticsCard
          backgroundColor= "#ffcccc"

            icon={
              <AttachMoneyOutlined
                style={{
                  marginBottom: "2rem",
                  color: "#000000",
                  backgroundColor: "#ffcccc",
                  borderRadius: "50%",
                  padding: "0.5rem",
                  boxShadow: "0 3px 10px rgba(0, 0, 0, 0.15)",
                }}
                fontSize="large"
              />
            }
            description="Total Revenues (This Week)"
            value={`${weeklyRevenues} $`}
          />
        </Grid>

       
          
        <Grid style={{ marginTop: "2rem", textAlign:"center", }} item xs={12} sm={6} md={3}>
          <StatisticsCard
            backgroundColor= "#ffddb3"

            icon={
              <TrendingDownOutlined
                style={{
                  marginBottom: "2rem",
                  backgroundColor: "#ffddb3",
                  borderRadius: "50%",
                  padding: "0.5rem",
                  boxShadow: "0 3px 10px rgba(0, 0, 0, 0.15)",
                  color: "#000000",
                }}
                fontSize="large"
              />
            }
            value={`Table ${leastBookedTableData}`}
            description="Least Booked Table"
          />
        </Grid>

        <Grid style={{ marginTop: "2rem", textAlign:"center", }} item xs={12} sm={6} md={3}>
          <StatisticsCard
           backgroundColor= "#c2e0ff"

            icon={
              <TrendingUpOutlined
                style={{
                  marginBottom: "2rem",
                  backgroundColor: "#c2e0ff",
                  borderRadius: "50%",
                  padding: "0.5rem",
                  boxShadow: "0 3px 10px rgba(0, 0, 0, 0.15)",
                  color: "#000000",
                }}
                fontSize="large"
              />
            }
            value={`Table ${mostBookedTable}`}
            description="Most Booked Table"
          />
        </Grid>

        {/* Charts */}


        <Grid item xs={12} sm={6}>

 {/* Daily */}
 <Card id="chart-card">
  <CardContent>
    <Typography sx={{textAlign:"center"}} variant="h5" gutterBottom>
      Daily Reservations (This Week)
    </Typography>
    <LineChart
  width={cardWidth - 20}
  height={300}
  data={dailyReservations}
  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
>
  <CartesianGrid strokeDasharray="4 4" />
  <XAxis dataKey="day" tickFormatter={(tick) => dayjs(tick).format("MMM DD")} />
  <YAxis />
  <Tooltip content={(props) => renderCustomTooltip(props, "daily")} />
  <Legend />
  <Line type="monotone" dataKey="reservations" stroke="#D25F00" fill="#D25F00" />
</LineChart>
  </CardContent>
</Card>

     
      

        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Weekly */}
          <Card id="chart-card">
  <CardContent>
    <Typography sx={{textAlign:"center"}} variant="h5" gutterBottom>
      Weekly Reservations (This Month)
    </Typography>
    <LineChart
  width={cardWidth - 20}
  height={300}
  data={weeklyReservations}
  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
>
  <CartesianGrid strokeDasharray="4 4" />
  <XAxis dataKey="week" tickFormatter={(tick) => dayjs(tick).format("MMM DD [Week]")} />
  <YAxis />
  <Tooltip content={(props) => renderCustomTooltip(props, "weekly")} />
  <Legend />
  <Line type="monotone" dataKey="reservations" stroke="#D25F00" fill="#D25F00" />
</LineChart>
  </CardContent>
</Card>

        </Grid>
        
       
        <Grid item xs={12} md={6} lg={6}>
          <StatisticsPieChart data={bookingPieChartData} COLORS={COLORS} />
        </Grid>


        <Grid item xs={12} sm={6} lg={6}>
   {/* Monthly */}
       
   <Card id="chart-card">
      <CardContent>
        <Typography variant="h5" sx={{textAlign:"center"}} gutterBottom>
        Monthly Reservations (This Year)
        </Typography>
        <BarChart
  width={cardWidth - 20}
  height={300}
  data={monthlyReservations}
  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="day" tickFormatter={(tick) => dayjs(tick).format("MMM")} />
  <YAxis />
  <Tooltip content={(props) => renderCustomTooltip(props, "monthly")} />
  <Legend />
  <Bar dataKey="reservations" fill="#1387FF" />
</BarChart>
      </CardContent>
    </Card>

       
      
        </Grid>

      </Grid>
    </div>
  );
};

export default StatisticsDashboard;
