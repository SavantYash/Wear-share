// *****
// common page for showcase the previous donations for all user via id
// *****

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer, Bounce } from 'react-toastify'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export const Donations = () => {

  const [donations, setdonations] = useState([])
  const [history, sethistory] = useState([])
  const navigate = useNavigate()
  const userId = localStorage.getItem("id")

  const getDataByUserId = async () => {
    //for donation collection
    const res = await axios.get("/donation/getdatabyid/" + userId)
    console.log("current",res)
    setdonations(res.data.data)
    //for history collection
    const res1 = await axios.get("/history/get/" + userId)
    sethistory(res1.data.data)
    console.log("past", res1)
  }

  const DeleteById = async (id) => {
    const res = await axios.delete("/donation/deletedonation/" + id)

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
    getDataByUserId()
  }

  useEffect(() => {
    getDataByUserId()
  }, [])

  const renderDonationCard = (donation) => (
    <Card key={donation._id} sx={{ maxWidth: 300 }}>
      <div className='overflow-hidden d-flex justify-content-center align-items-center' style={{ height: '23rem' }}>
        <img src={donation.imageURL} alt="donation" className="card-img-top" style={{ borderRadius: '6px', marginTop: '15px' }} />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h6">{donation?.description}</Typography>
        <Typography variant="body2">Size - {donation?.size}</Typography>
        <Typography variant="body2">Address - {donation?.address}</Typography>
        <Typography variant="body2" sx={{ mt: 1.2 }}>
          <strong>Status:</strong> {donation?.status || "N/A"}
        </Typography>
        {/* <Button
          variant="outlined"
          color="error"
          size="small"
          sx={{ mt: 1 }}
          onClick={() => DeleteById(donation._id)}
        >
          Delete
        </Button> */}
        {localStorage.getItem('role') === "ngo" && donation?.status == "Delivered" && (
            <Box mt={2}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => { navigate("/ngo/upload/"+donation?._id)}}
              >
                {/* {getActionLabel()} */}

                upload pic
              </Button>
            </Box>
          )}
          {localStorage.getItem('role') === "donor" && donation?.status == "Delivered" && (
            <Box mt={2}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => { navigate("/user/details/"+donation?._id)}}
              >
                {/* {getActionLabel()} */}

                see details
              </Button>
            </Box>
          )}
          {localStorage.getItem('role') === "volunteer" && donation?.status == "Delivered" && (
            <Box mt={2}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => { navigate("/volunteer/details/"+donation?._id)}}
              >
                {/* {getActionLabel()} */}

                see details
              </Button>
            </Box>
          )}
      </CardContent>
    </Card>
  );

  const ongoing = history?.filter(
    d => d?.status === "Pending" || d?.status === "PickedUp" || d?.status === "Assign Volunteer"
  );
  const delivered = history?.filter(d => d?.status === "Delivered");

  return (
    history?.length == 0 ? (
      <Typography textAlign="center" fontSize="larger" mt={5}>
        Not donated yet!<br />Make Donation & feel Happy
      </Typography>
    ) : (
      <>
        <Typography variant="h5" gutterBottom>InProcess Donations</Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 3,
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
                  {donation?.description}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Size - {donation?.size}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Address - {donation?.address}
                </Typography><br />
                <Button variant="contained" onClick={() => { DeleteById(donation._id) }}>Delete</Button>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Divider sx={{ my: 3 }} />
        <>
          {/* Ongoing Section */}
          <Typography variant="h5" gutterBottom>Ongoing Donations</Typography>
          <Box display="flex" flexWrap="wrap" gap={3} mb={4}>
            {ongoing?.length > 0 ? ongoing?.map(renderDonationCard) : (
              <Typography>No ongoing donations.</Typography>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Delivered Section */}
          <Typography variant="h5" gutterBottom>Delivered Donations</Typography>
          <Box display="flex" flexWrap="wrap" gap={3}>
            {
              delivered?.length > 0 ? delivered?.map(renderDonationCard) : (
                <Typography>No delivered donations yet.</Typography>
              )
            }
          </Box>
        </>
      </>
    )
  )

}
