import React, { useState } from 'react';
import {
    Box, Button, Card, CardContent, CardHeader, Checkbox, FormControl,
    FormControlLabel, FormHelperText, FormLabel, Grid, InputLabel, MenuItem,
    Radio, RadioGroup, Select, TextField, Typography
} from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm, Controller } from 'react-hook-form';

export const AddClothes = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const [donationFlag, setDonationFlag] = useState(false);

    const onSubmit = async (data) => {
        setDonationFlag(true);
        const formData = new FormData();
        formData.append("donorId", localStorage.getItem("id"));
        formData.append("category", data.category);
        formData.append("size", data.size);
        formData.append("quantity", data.quantity);
        formData.append("condition", data.condition);
        formData.append("description", data.description);
        formData.append("address", data.address);
        formData.append("image", data.image[0]);

        try {
            const res = await axios.post("/donation/addwithfile", formData);
            setDonationFlag(false);
            if (res.status === 201) {
                toast.success("Donation posted!", {
                    position: "top-right",
                    autoClose: 3000,
                    transition: Bounce,
                });
            }
        } catch (err) {
            setDonationFlag(false);
            toast.error("Failed to post donation.");
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 5 }}>
            <ToastContainer />
            <Card sx={{ maxWidth: 600, width: '100%' }}>
                <CardHeader title="Post a Clothing Donation" sx={{ textAlign: 'center' }} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                        <Grid container spacing={2}>
                            {/* Image Upload */}
                            <Grid item xs={12}>
                                <input type="file" {...register("image", { required: true })} />
                                {errors.image && <FormHelperText error>Image is required</FormHelperText>}
                            </Grid>

                            {/* Category */}
                            <Grid item xs={12}>
                                <FormControl component="fieldset" error={!!errors.category}>
                                    <FormLabel>Category</FormLabel>
                                    <Controller
                                        name="category"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <RadioGroup row {...field}>
                                                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                            </RadioGroup>
                                        )}
                                    />
                                    {errors.category && <FormHelperText>Category is required</FormHelperText>}
                                </FormControl>
                            </Grid>

                            {/* Size */}
                            <Grid item xs={12}>
                                <FormControl fullWidth error={!!errors.size}>
                                    <InputLabel id="size-label">Size</InputLabel>
                                    <Select
                                        labelId="size-label"
                                        id="size"
                                        defaultValue=""
                                        label="Size"
                                        {...register("size", { required: true })}
                                    >
                                        <MenuItem value="S">S</MenuItem>
                                        <MenuItem value="M">M</MenuItem>
                                        <MenuItem value="L">L</MenuItem>
                                        <MenuItem value="XL">XL</MenuItem>
                                    </Select>
                                    {errors.size && <FormHelperText>Size is required</FormHelperText>}
                                </FormControl>
                            </Grid>


                            {/* Quantity */}
                            <Grid item xs={12}>
                                <TextField
                                    label="Quantity"
                                    fullWidth
                                    type="number"
                                    {...register("quantity", { required: true })}
                                    error={!!errors.quantity}
                                    helperText={errors.quantity && "Quantity is required"}
                                />
                            </Grid>

                            {/* Condition */}
                            <Grid item xs={12}>
                                <TextField
                                    label="Condition"
                                    fullWidth
                                    {...register("condition")}
                                />
                            </Grid>

                            {/* Description */}
                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    {...register("description")}
                                />
                            </Grid>

                            {/* Address */}
                            <Grid item xs={12}>
                                <TextField
                                    label="Address"
                                    fullWidth
                                    {...register("address", { required: true })}
                                    error={!!errors.address}
                                    helperText={errors.address && "Address is required"}
                                />
                            </Grid>

                            {/* Terms */}
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox required />}
                                    label="I agree to the terms and conditions"
                                />
                            </Grid>

                            {/* Submit */}
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" fullWidth disabled={donationFlag}>
                                    {donationFlag ? 'Posting...' : 'Post Donation'}
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </form>
            </Card>
        </Box>
    );
};
