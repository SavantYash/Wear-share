import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';


export const AdminDashboard = () => {
    const [seriesData, setSeriesData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [totalDonations, setTotalDonations] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [count, setCount] = useState(0);
    const [count1, setCount1] = useState(0);

    

    useEffect(() => {
        if (totalDonations, totalUsers > 0) {
          const interval = setInterval(() => {
            setCount((prevCount) => {
              const nextCount = Math.min(prevCount + 1, totalDonations);
              if (nextCount === totalDonations) {
                clearInterval(interval);
              }
              return nextCount;
            });
          }, 10);
          const interval1 = setInterval(() => {
            setCount1((prevCount) => {
              const nextCount = Math.min(prevCount + 1, totalDonations);
              if (nextCount === totalUsers) {
                clearInterval(interval1);
              }
              return nextCount;
            });
          }, 100);
        }
      }, [totalDonations]);

    useEffect(() => {
        getAllDonations();
        getAllUsers()
    }, []);

    const getAllDonations = async () => {
        try {
            const res = await axios.get("/history/getall");
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

    const getAllUsers = async () => {
        try{
            const res = await axios.get("/getallusers")
            setTotalUsers(res.data.data.length)
        }catch(err){
            console.log(err)
        }
    }

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
              alignItems: 'center',
              marginLeft:'15px'
            }}
          >
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Total Users
            </Typography>
  
            {/* Animated Total Donations Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Typography variant="h4" color="primary" fontWeight={700}>
                {count1}
              </Typography>
            </motion.div>
          </Paper>
          
        </Box>
      </Box>
    );
};
