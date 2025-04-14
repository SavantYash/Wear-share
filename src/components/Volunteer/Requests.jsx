import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer, Bounce } from 'react-toastify'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

export const VolunteerRequests = () => {

    const [data, setData] = useState([])

    const getData = async () => {
        const res = await axios.get("/transport/get")
        setData(res.data.data)
        console.log(res.data.data)
    }

    useEffect(() => {
        getData()
    }, [])

    const onAccept = async(id) => {
        console.log(id)
        await axios.get('/transport/update/'+localStorage.getItem('id')+"/"+id)         
          
    }

  return (
          data == null ? (
              <div style={{ textAlign: "center", marginTop: "80px", fontSize: "larger" }}>
                  not donated yet!<br />Make Donation & feel Happy
              </div>
          ) : (
              <Box
                  sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      gap: 3,
                      padding: 3,
                  }}
              >
                  <ToastContainer
                      position="top-right"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick={false}
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
                      transition={Bounce}
                  />
  
                  {data?.map((d, index) => (
                      <Card key={index} sx={{ maxWidth: 300 }}>
                          <div className='overflow-hidden d-flex justify-content-center align-items-center' style={{ height: '23rem' }}>
                              <img src={d.historyId?.imageURL} className="card-img-top" alt="..." style={{ borderRadius: '6px', marginTop: '15px' }} />
                          </div>
                          <CardContent>
                              <Typography gutterBottom variant="h5" component="div">
                                  Lizard
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                  Lizards are a widespread group of squamate reptiles, with over 6,000
                                  species, ranging across all continents except Antarctica
                              </Typography><br />
                              <Button variant="contained" onClick={() => { onAccept(d._id) }}>Accept</Button>
                          </CardContent>
                      </Card>
                  ))}
              </Box>
          )
      )
}
