import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer, Bounce } from 'react-toastify'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

export const DonorRequests = () => {

    const [requests, setrequests] = useState([])

    const getAllRequest = async () => {
        const res = await axios.get("/request/get/" + localStorage.getItem('id'))
        console.log(res)
        setrequests(res.data.data)
    }

    const onAcceptreq = async (id) => {
        const res = await axios.get("/request/update/" + id)
        res.status === 202 && toast.success('Request accepted!', {
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
        getAllRequest()
    }

    useEffect(() => {
        getAllRequest()
    }, [])


    return (
        requests == null ? (
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

                {requests?.map((donation, index) => (
                    <Card key={index} sx={{ maxWidth: 300 }}>
                        <div className='overflow-hidden d-flex justify-content-center align-items-center' style={{ height: '23rem' }}>
                            <img src={donation.imageURL} className="card-img-top" alt="..." style={{ borderRadius: '6px', marginTop: '15px' }} />
                        </div>
                        <CardContent>

                            <Typography gutterBottom variant="h6">From : {donation?.ngoId?.name}</Typography>
                            <Typography gutterBottom variant="h6">{donation?.ngoId?.address}</Typography>
                            <Typography variant="body2">Number - {donation?.ngoId?.number}</Typography>
                            <Button variant="contained" onClick={() => { onAcceptreq(donation._id) }}>Accept</Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        )
    )
}
