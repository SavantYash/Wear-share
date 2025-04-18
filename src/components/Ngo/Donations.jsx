import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer, Bounce } from 'react-toastify'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

export const NgoDonations = () => {

    const [donations, setdonations] = useState([])

    const getDataByUserId = async () => {
        const res = await axios.get("/donation/get/")
        setdonations(res.data.data)
    }

    const ApplyById = async (donation) => {
        donation.donationId = donation._id;
        donation.ngoId = localStorage.getItem("id")
        const res = await axios.post("/request/add",donation);
    }

    useEffect(() => {
        getDataByUserId()
    }, [])

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
                                {donation?.description}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Size - {donation?.size}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Address - {donation?.address}
                            </Typography>
                            <Button variant="contained" onClick={() => { ApplyById(donation) }}>Apply</Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        )
    )
}
