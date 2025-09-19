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
import { useLocation, useNavigate } from 'react-router-dom';


export const DonationHistory = () => {

    const [history, sethistory] = useState([])
    const userId = localStorage.getItem("id")
    const location = useLocation()
    const navigate = useNavigate()

    const getDataByUserId = async () => {
        //for history collection
        const res1 = await axios.get("/history/getall")
        sethistory(res1.data.data)
        console.log("past", res1.data.data)
    }

    useEffect(() => {
        getDataByUserId()
    }, [])



    const renderDonationCard1 = (donation) => (
        <Card key={donation._id} sx={{ maxWidth: 300 }}>
            <div className='overflow-hidden d-flex justify-content-center align-items-center p-1' style={{ height: '23rem' }}>
                <img src={donation.imageUrl} alt="donation" className="card-img-top" style={{ borderRadius: '6px', marginTop: '15px' }} />
            </div>
            <CardContent>
                {localStorage.getItem('role') === "donor" &&
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Ngo - {donation?.ngoId?.name}
                    </Typography>
                }
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Volunteer Name - {donation?.volunteerId?.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Status - {donation?.status}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Address - {donation?.address}
                </Typography>

                {donation?.items?.length > 0 && (
                    <>
                        <Typography variant="subtitle2" sx={{ mt: 1 }}>Items:</Typography>
                        {donation.items.map((item, idx) => (
                            <Typography key={idx} variant="body2">
                                {item.name} - {item.quantity}
                            </Typography>
                        ))}
                    </>
                )}
                <Box mt={2}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => { navigate("/v/details/" + donation?._id) }}
                    >
                        {/* {getActionLabel()} */}

                        see details
                    </Button>
                </Box>
            </CardContent>

        </Card>
    );

    const ongoing = history?.filter(
        d => d?.status === "Pending" || d?.status === "PickedUp" || d?.status === "Assign Volunteer"
    );
    const delivered = history?.filter(d => d?.status === "Delivered");

    const distribute = history?.filter(d => d?.status === "distribute");

    return (
        history?.length == 0 ? (
            <Typography textAlign="center" fontSize="larger" mt={5}>
                Not donated yet!<br />Make Donation & feel Happy
            </Typography>
        ) : (

            <>
                {/* Ongoing Section */}
                <Typography Typography variant="h5" gutterBottom>Ongoing Donations</Typography>
                <Box display="flex" flexWrap="wrap" gap={3} mb={4} sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 3,
                }}>
                    {ongoing?.length > 0 ? ongoing?.map(renderDonationCard1) : (
                        <Typography>No ongoing donations.</Typography>
                    )}
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Delivered Section */}
                <Typography variant="h5" gutterBottom>Delivered Donations</Typography>
                <Box display="flex" flexWrap="wrap" gap={3} sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 3,
                }}>
                    {
                        delivered?.length > 0 ? delivered?.map(renderDonationCard1) : (
                            <Typography>No delivered donations yet.</Typography>
                        )
                    }
                </Box>

                {/* Distributed Section */}
                <Typography variant="h5" gutterBottom>Distributed Donations</Typography>
                <Box display="flex" flexWrap="wrap" gap={3} mb={4} sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 3,
                }}>
                    {distribute?.length > 0 ? distribute?.map(renderDonationCard1) : (
                        <Typography>No distribute donations yet.</Typography>
                    )}
                </Box>

                <Divider sx={{ my: 3 }} />
            </>

        )
    )

}
