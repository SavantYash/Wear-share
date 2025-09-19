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
    const [appliedDonationIds, setAppliedDonationIds] = useState([]);

    const getDataByUserId = async () => {
        const res = await axios.get("/donation/get/")
        console.log(res.data.data)
        setdonations(res.data.data)
    }

    const getAppliedDonations = async () => {
        const res = await axios.get("/request/byNgo/" + localStorage.getItem('id'))
        setAppliedDonationIds(res.data.donationIds);
    }

    const ApplyById = async (donation) => {
        donation.donationId = donation._id;
        donation.ngoId = localStorage.getItem("id")
        await axios.post("/request/add", donation);
    }

    useEffect(() => {
        getDataByUserId()
        getAppliedDonations()
    }, [])

    const filteredDonations = donations?.filter(
        (donation) => !appliedDonationIds.includes(donation._id)
    );

    return (
        <Box sx={{ padding: 3 }}>
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

            {filteredDonations.length === 0 ? (
                <div style={{ textAlign: "center", marginTop: "80px", fontSize: "larger" }}>
                    🎉 You've already applied for all available donations!<br />
                    Please check back later for new ones.
                </div>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: 3,
                    }}
                >
                    {filteredDonations.map((donation, index) => (
                        <Card key={index} sx={{ maxWidth: 300 }}>
                            <div
                                className="overflow-hidden d-flex justify-content-center align-items-center"
                                style={{ height: '23rem' }}
                            >
                                <img
                                    src={donation.imageUrl}
                                    className="card-img-top"
                                    alt="..."
                                    style={{ borderRadius: '6px', marginTop: '15px' }}
                                />
                            </div>
                            <CardContent>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Donor Name - {donation?.donorId?.name}
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

                                <br />
                                <Button variant="contained" onClick={() => { ApplyById(donation) }}>
                                    Apply
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );

}
