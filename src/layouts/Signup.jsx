import React, { useState } from "react";
import "../styles/Signup.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer, Bounce } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./NavbarIndex";

const SignUp = () => {
    const [userSelection, setUserSelection] = useState("donor");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    // const [email, setEmail] = useState("")

    // const verifyEmail = async () => {
    //     console.log(email)
    //     const res = await axios.post("/code", { email: email })
    // }

    const submitHandler = async (data) => {
        data.role = userSelection === "donor"
            ? "67bd4b283f21fec783f8bb4e"
            : userSelection === "ngo"
                ? "67bd4b3d3f21fec783f8bb50"
                : "67edb26c77edf64f666aeab1";

        const res = await axios.post("/addUser", data);
        console.log(res);

        if (res.status === 201) {
            toast.success('User registered successfully!', {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                transition: Bounce,
            });
            navigate('/');
        } else {
            toast.error(res.data.message, {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                transition: Bounce,
            });
        }
    };

    const validation = {
        name: {
            required: "Name is required",
            minLength: { value: 3, message: "Too short" },
            maxLength: { value: 15, message: "Too long" }
        },
        email: {
            required: "*",
            pattern: {
                value: /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/,
                message: "Invalid email"
            }
        },
        number: {
            required: "*",
            pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Invalid number"
            }
        },
        password: {
            required: "*",
            pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                message: "Weak password"
            }
        },
        address: {
            required: "*"
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer theme="dark" transition={Bounce} />
            <div className="signin-container" style={{ marginTop: '60px' }}>
                <form className="signin-form" onSubmit={handleSubmit(submitHandler)}>
                    <h2>Sign Up</h2>

                    <select value={userSelection} onChange={(e) => setUserSelection(e.target.value)}>
                        <option value="donor">Donor</option>
                        <option value="ngo">NGO</option>
                        <option value="volunteer">Volunteer</option>
                    </select>

                    <input type="text" placeholder="Name" {...register('name', validation.name)} />
                    <span style={{ color: 'red' }}>{errors.name?.message}</span>

                    <input type="text" placeholder="Email" {...register('email', {
                        ...validation.email,
                        onChange: (e) => setEmail(e.target.value)
                    })} />
                    {/* <button style={{ width: '60px', height: '20px', padding: '1px' }} onClick={() => { verifyEmail() }}>Verify</button> */}
                    <span style={{ color: 'red' }}>{errors.email?.message}</span>

                    <input type="text" placeholder="Phone Number" {...register('number', validation.number)} />
                    <span style={{ color: 'red' }}>{errors.number?.message}</span>

                    <textarea placeholder="Address" {...register('address', validation.address)} />
                    <span style={{ color: 'red' }}>{errors.address?.message}</span>

                    <input type="password" placeholder="Password" {...register('password', validation.password)} />
                    <span style={{ color: 'red' }}>{errors.password?.message}</span>
                    <p>Password must be minimum 8 char long with atleast one uppercase,number & special char</p>

                    {userSelection === "ngo" && (
                        <>
                            <input type="text" placeholder="NGO Reg. Number" {...register('registrationNumber')} />
                            <input type="url" placeholder="Website (Optional)" {...register('website')} />
                            <input type="file" accept=".pdf,.jpg,.png" {...register('verificationDoc')} />
                        </>
                    )}

                    <button type="submit">Register</button>
                    <p>Already registered? <Link to="/signin">Login</Link></p>
                </form>
            </div>
        </>
    );
};

export default SignUp;
