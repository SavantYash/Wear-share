import { Button, FormHelperText, Grid, Input } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer, Bounce } from 'react-toastify';

export const UploadPic = () => {

    const id = useParams().id
    const navigate = useNavigate()
    const [flag, setflag] = useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm()

    useEffect(() => {
        console.log(id)
    }, [])

    const submitHandler = async (data) => {
        setflag(false)
        const formData = new FormData();
        formData.append("id", data.id)
        formData.append("image", data.image[0]);
        try {
            const res = await axios.post("/history/upload", formData)
            setflag(true)
            setTimeout(()=>{
            res.status == 201 && toast.success('Pic uploaded!', {
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
        },500)
            navigate("/ngo/donations")
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            {!flag ? <h1>loading...</h1> :
                <form onSubmit={handleSubmit(submitHandler)}>
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
                    <Grid item xs={12} sx={{ margin: '10rem' }}>
                        <input hidden value={id} {...register("id")} />
                        Upload image :<br />
                        <Input type="file" {...register("image", { required: true })} />
                        {errors.image && <FormHelperText error>Image is required</FormHelperText>}
                        <Button type="submit">Upload</Button>
                    </Grid>
                    <Grid item xs={12} sx={{ margin: '10rem' }}>

                    </Grid>
                </form>
            }
        </>
    )
}
