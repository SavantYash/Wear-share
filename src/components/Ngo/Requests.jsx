import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer, Bounce } from 'react-toastify'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

export const NgoRequests = () => {

    const [donations, setdonations] = useState([])

  useEffect(() => {
    getRequest()
  }, [])

  const getRequest = async () => {
    const res = await axios.get("/request/getu/" + localStorage.getItem('id'))
    setdonations(res.data.data)
    console.log(res.data.data)
  }

  const DeleteById = async(id) => {
          console.log(id)
          // const res = await axios.delete("/donation/deletedonation/"+id)
          
          res == 200 && toast.success('Post deleted!', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
          });
          getRequest()
      }

  return (
          donations == null ? (
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
  
                  {donations?.map((donation, index) => (
                      <Card key={index} sx={{ maxWidth: 300 }}>
                          <div className='overflow-hidden d-flex justify-content-center align-items-center' style={{ height: '23rem' }}>
                              <img src={donation.imageURL} className="card-img-top" alt="..." style={{ borderRadius: '6px', marginTop: '15px' }} />
                          </div>
                          <CardContent>
                              <Typography gutterBottom variant="h5" component="div">
                                  Lizard
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                  Lizards are a widespread group of squamate reptiles, with over 6,000
                                  species, ranging across all continents except Antarctica
                              </Typography><br />
                              <Button variant="contained" onClick={() => { DeleteById(donation._id) }}>Delete</Button>
                          </CardContent>
                      </Card>
                  ))}
              </Box>
          )
      )
}
