import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer, Bounce } from 'react-toastify'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Accepted = () => {

    const navigate = useNavigate()
    const [data, setdata] = useState([])

    const getData = async () => {
        const res = await axios.get("/transport/getv/" + localStorage.getItem('id'))
        setdata(res.data.data)
        console.log(res.data.data)
    }

    const onTrack = (id) => {
        navigate("/v/track/"+id)
    }

    useEffect(() => {
        getData()
    }, [])

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
                        <div className='overflow-hidden d-flex justify-content-center align-items-center' style={{ height: '20rem',margin:'10px' }}>
                            <img src={d.historyId?.imageURL} className="card-img-top" alt="..." style={{ borderRadius: '6px', margin: '15px' }} />
                        </div>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Description - {d?.description}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                <h4>From</h4>
                                Name : {d?.historyId?.donorId?.name}<br />
                                Address : {d?.historyId?.donorId?.address}
                            </Typography><br />
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                <h4>To</h4>
                                Name : {d?.historyId?.ngoId?.name}<br />
                                Address : {d?.historyId?.ngoId?.address}
                            </Typography>
                            <Button variant="contained" onClick={() => { onTrack(d?._id) }}>Track</Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        )
    )
}
