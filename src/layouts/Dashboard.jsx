import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import { Box, Typography, Paper, AppBar, Toolbar, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Bounce, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export const Dashboard = () => {
  const [seriesData, setSeriesData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);
  const [count, setCount] = useState(0);
  const navigate = useNavigate()



  useEffect(() => {
    if (totalDonations > 0) {
      const interval = setInterval(() => {
        setCount((prevCount) => {
          const nextCount = Math.min(prevCount + 1, totalDonations);
          if (nextCount === totalDonations) {
            clearInterval(interval);
          }
          return nextCount;
        });
      }, 10);
    }
  }, [totalDonations]);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    try {
      const res = await axios.get("/history/get/" + localStorage.getItem('id'));
      const donations = res.data.data;
      setTotalDonations(res.data.data.length)

      const now = dayjs();
      const last5Months = [];

      // Prepare last 5 months
      for (let i = 4; i >= 0; i--) {
        last5Months.push(now.subtract(i, 'month').format('YYYY-MM'));
      }

      const countMap = {};
      last5Months.forEach(month => (countMap[month] = 0));

      donations.forEach(donation => {
        const createdMonth = dayjs(donation.createdAt).format('YYYY-MM');
        if (countMap.hasOwnProperty(createdMonth)) {
          countMap[createdMonth]++;
        }
      });

      const formattedData = last5Months.map(month => ({
        x: month,
        y: countMap[month]
      }));

      setSeriesData([{ name: 'Donations', data: formattedData }]);
      setCategories(last5Months);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const options = {
    chart: {
      height: 350,
      type: 'bar'
    },
    plotOptions: {
      bar: {
        columnWidth: '60%'
      }
    },
    colors: ['#00E396'],
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: categories,
      title: {
        text: 'Month'
      }
    },
    title: {
      text: 'Donations in Last 5 Months',
      align: 'center'
    }
  };

  return (
    <>
      <AppBar position="static">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="dark"
          transition={Bounce}
        />
        <Toolbar>
          <Button
            color="inherit"
            onClick={() =>
              navigate(
                localStorage.getItem("role") === "donor"
                  ? "/user"
                  : localStorage.getItem("role") === "ngo"
                    ? "/ngo"
                    : "/v"
              )
            }
          >
            Home
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,

        }}
      >
        <Typography variant="h4" fontWeight="600" color="textPrimary" gutterBottom>
          Donation History
        </Typography>

        {/* Chart */}
        <Box sx={{ width: '100%', maxWidth: 900 }}>
          <Chart options={options} series={seriesData} type="bar" width="100%" height={350} />
        </Box>

        {/* Total Donations Box */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: 400,
            marginTop: 4
          }}
        >
          <Paper
            elevation={5}
            sx={{
              padding: 3,
              textAlign: 'center',
              width: '100%',
              borderRadius: 3,
              boxShadow: '0px 6px 15px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Total Donations
            </Typography>

            {/* Animated Total Donations Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Typography variant="h4" color="primary" fontWeight={700}>
                {count}
              </Typography>
            </motion.div>
          </Paper>
        </Box>
      </Box>
    </>
  );
};
