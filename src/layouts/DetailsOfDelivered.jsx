import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Card, CardContent, Typography } from '@mui/material';

export const DetailsOfDelivered = () => {

    const id = useParams().id
    const [donation, setdonation] = useState()
    useEffect(() => {
        getdata()
    }, [])

    const getdata = async () => {
        try {
            const res = await axios.get("/history/gethistory/" + id)
            console.log(res.data.data)
            setdonation(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }
    if (!donation) return <Typography>Loading...</Typography>;
    return (

        donation?.imageUrl2 ?

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
                marginTop="80px"
            >
                <Card key={donation?._id} sx={{ maxWidth: 300 }}>
                    <Box
                        className="overflow-hidden"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="23rem"
                    >
                        <img
                            src={donation?.imageUrl2}
                            alt="donation"
                            className="card-img-top"
                            style={{ borderRadius: '6px', marginTop: '15px', maxHeight: '100%', objectFit: 'cover' }}
                        />
                    </Box>
                    <CardContent>
                        <Typography gutterBottom variant="h6">{donation?.description}</Typography>
                        <Typography variant="body2" sx={{ mt: 1.2 }}>
                            <strong>Status:</strong> {donation?.status || "N/A"}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            : <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
            >

                Pic is not uploaded yet by {donation?.ngoId?.name}
                You can wait or make an inquiry at below details<br/> Eamil :  {donation?.ngoId?.email}<br/>Number : {donation?.ngoId?.number}
                <br/>
                Or report to admin
            </Box>
    )
}
