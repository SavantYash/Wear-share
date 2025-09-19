import React, { useEffect, useState } from 'react'
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Box,
    Divider,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const Tracking = ({onAction}) => {

    const id = useParams().id
    const [data, setdata] = useState({})

    const stages = ["Assign Volunteer", "PickedUp", "Delivered"];
    const colors = {
        Pending: "#fdd835",      // Yellow
        PickedUp: "#fb8c00",    // Orange
        Delivered: "#43a047",      // Green
    };

    const activeIndex = stages.indexOf(data?.status);

    const getData = () => {
        axios.get("/transport/get/" + id)
            .then((res) => {
                setdata(res.data.data)
                console.log(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    const onTrack = async (id) => {
        await axios.get("/transport/update/" + id)
    }


    useEffect(() => {
        getData()
    }, [])


    return (
        <>
            <Card sx={{ maxWidth: 400, margin: '10px auto', borderRadius: 3, boxShadow: 4 }}>
                <div className='d-flex align-items-center' style={{ padding: '5px', height: '300px' }}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={data?.historyId?.imageUrl}
                        alt="Donation"
                        sx={{ objectFit: 'cover', borderRadius: '5px' }}
                    />
                </div>

                <CardContent>
                    {/* Pick-up Details */}
                    <Typography variant="h6" gutterBottom>
                        🛍️ Pick-Up Details
                    </Typography>
                    <Typography variant="body2"><strong>Donor:</strong> {data?.historyId?.donorId?.name} </Typography>
                    <Typography variant="body2"><strong>Address:</strong> {data?.historyId?.donorId?.address} </Typography>
                    <Typography variant="body2"><strong>Phone:</strong> {data?.historyId?.donorId?.number} </Typography>

                    <Divider sx={{ my: 2 }} />

                    {/* Drop-off Details */}
                    <Typography variant="h6" gutterBottom>
                        🏥 Drop-Off Details
                    </Typography>
                    <Typography variant="body2"><strong>NGO:</strong> {data?.historyId?.ngoId?.name} </Typography>
                    <Typography variant="body2"><strong>Address:</strong> {data?.historyId?.ngoId?.address} </Typography>
                    <Typography variant="body2"><strong>Phone:</strong> {data?.historyId?.ngoId?.number} </Typography>

                    <Divider sx={{ my: 2 }} />

                    {/* Status */}
                    <Typography variant="body1" color="text.secondary">
                        <strong>Status:</strong>
                    </Typography>

                    <Box display="flex" flexDirection="column" alignItems="center">
                        {/* Dots + Lines */}
                        <Box display="flex" alignItems="center" width="100%" justifyContent="space-between">
                            {stages.map((stage, index) => (
                                <Box key={stage} display="flex" alignItems="center" flex={1}>
                                    {/* Dot */}
                                    <Box
                                        sx={{
                                            width: 16,
                                            height: 16,
                                            borderRadius: "50%",
                                            backgroundColor: index <= activeIndex ? colors[data?.status] : "#cfd8dc",
                                        }}
                                    />
                                    {/* Line */}
                                    {index < stages.length - 1 && (
                                        <Box
                                            sx={{
                                                flexGrow: 1,
                                                height: 2,
                                                backgroundColor: index < activeIndex ? colors[data?.status] : "#e0e0e0",
                                            }}
                                        />
                                    )}
                                </Box>
                            ))}
                        </Box>

                        {/* Status label below the active dot */}
                        <Box display="flex" justifyContent="space-between" width="100%" mt={1}>
                            {stages.map((stage, index) => (
                                <Box key={stage} flex={1} textAlign="center">
                                    {index === activeIndex ? (
                                        <Typography variant="caption" sx={{ color: colors[data?.status], fontWeight: 600 }}>
                                            {stage.replace("_", " ")}
                                        </Typography>
                                    ) : (
                                        <Typography variant="caption" color="text.disabled">
                                            {/* Keep space to align */}
                                            &nbsp;
                                        </Typography>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Box>


                    {/* Action Button */}
                    {onAction && ( 
                    <Box mt={2}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => { onTrack(data?._id) }}
                        >
                            {/* {getActionLabel()} */}

                            {data.status == "Assign Volunteer" ? "Picked Up" : data.status == "PickedUp" ? "Dilivered" : ""}
                        </Button>
                    </Box>
                    )}
                </CardContent>
            </Card>
        </>
    )
}