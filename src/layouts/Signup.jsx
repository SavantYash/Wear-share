import React, { useState } from "react";
import "../styles/Signup.css"; // Importing external CSS file
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer, Bounce } from 'react-toastify'
import { Link, useNavigate } from "react-router-dom";


const SignUp = () => {
    const [userSelection, setuserSelection] = useState("donor")
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const submitHandler = async (data) => {
        data.role = userSelection == "donor" ? "67bd4b283f21fec783f8bb4e" : "67bd4b3d3f21fec783f8bb50"
        console.log(data)
        const res = await axios.post("/addUser", data)
        console.log(res)
        if (res.status === 201) {
            setTimeout(() => {
                toast.success('User register successfully!', {
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
            }, 500)
            navigate('/')
        } else {
            toast.success(res.data.message, {
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
        }
    }

    const validation = {
        name: {
            required: {
                value: true,
                message: "name is required"
            },
            minLength: {
                value: 3,
                message: 'Too short'
            },
            maxLength: {
                value: 15,
                message: 'Too long'
            }
        },
        age: {
            required: {
                value: true,
                message: '*'
            },
            min: {
                value: 18,
                message: 'minimum age is 18'
            },
            max: {
                vlaue: 50,
                message: 'maximum age is 50'
            }
        },
        email: {
            required: {
                value: true,
                message: '*'
            },
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Inavalid'
            }
        },
        number: {
            required: {
                value: true,
                message: "*"
            },
            pattern: {
                value: /^[6-9]\d{9}$/,
                message: 'Invalid number'
            }
        },
        password: {
            required: {
                value: true,
                message: '*'
            },
            pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                    "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character (@$!%*?&)",
            },
        },
        address: {
            required: {
                value: true,
                message: "*"
            }
        },
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            {/* <Navbar/> */}
            <div className="signup-container">
                <div className="form-container">
                    <h2>NGO Registration</h2>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="form-group">
                            <label >User Type :&nbsp;&nbsp;</label>
                            <select className='userSelection' onChange={(e) => setuserSelection(e.target.value)}>  {/*  {...register('type')} */}
                                <option value="donor">Donor</option>
                                <option value="ngo">NGO</option>
                            </select>
                        </div>


                        {
                            userSelection == "donor" ? (
                                <>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" name="Name" placeholder="Enter  Name" {...register('name', validation.name)} />
                                        <span>{errors.name?.message}</span>
                                    </div>

                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="text" name="email" placeholder="Enter Email" {...register('email', validation.email)} />
                                        <span>{errors.email?.message}</span>
                                    </div>

                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input type="text" name="phone" placeholder="Enter Phone Number" {...register('number', validation.number)} />
                                        <span>{errors.number?.message}</span>
                                    </div>

                                    <div className="form-group">
                                        <label>Address</label>
                                        <textarea name="address" placeholder="Enter Address" {...register('address', validation.address)}></textarea>
                                        <span>{errors.address?.message}</span>
                                    </div>

                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" name="password" placeholder="Enter Password" {...register('password', validation.password)} />
                                        <span>{errors.password?.message}</span>
                                    </div>

                                    {/* <div className="form-group">
                                <label>Confirm Password</label>
                                <input type="password" name="confirmPassword" placeholder="Confirm Password"/>
                                <span>{errors.confirmpassword?.message}</span>
                            </div> */}

                                </>
                            ) : (
                                <>
                                    <div className="form-group">
                                        <label>NGO Name</label>
                                        <input type="text" name="ngoName" placeholder="Enter NGO Name" {...register('name', validation.name)} />
                                        <span>{errors.name?.message}</span>
                                    </div>

                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="text" name="email" placeholder="Enter Email"  {...register('email', validation.email)} />
                                        <span>{errors.email?.message}</span>
                                    </div>

                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input type="text" name="phone" placeholder="Enter Phone Number" {...register('number', validation.number)} />
                                        <span>{errors.number?.message}</span>
                                    </div>

                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" name="password" placeholder="Enter Password" {...register('password', validation.password)} />
                                        <span>{errors.password?.message}</span>
                                    </div>

                                    {/* <div className="form-group">
                                <label>Confirm Password</label>
                                <input type="password" name="confirmPassword" placeholder="Confirm Password" {...register('cpassword', validation.confirmpassword)} />
                                <span>{errors.confirmpassword?.message}</span>
                            </div> */}

                                    <div className="form-group">
                                        <label>NGO Registration Number</label>
                                        <input type="text" name="registrationNumber" placeholder="Enter Registration Number" {...register('registrationNumber')} />
                                    </div>

                                    <div className="form-group">
                                        <label>Address</label>
                                        <textarea name="address" placeholder="Enter NGO Address" {...register('address', validation.address)}></textarea>
                                        <span>{errors.address?.message}</span>
                                    </div>

                                    <div className="form-group">
                                        <label>Website URL (Optional)</label>
                                        <input type="url" name="website" placeholder="Enter Website URL" />
                                    </div>

                                    <div className="form-group">
                                        <label>Upload Verification Document</label>
                                        <input type="file" name="verificationDoc" accept=".pdf,.jpg,.png" />
                                    </div>

                                </>
                            )
                        }
                        {/* conditions for password */}
                        <div className="password-rules" id="rules">
                            <p id="length" className="invalid">- At least 8 characters</p>
                            <p id="uppercase" className="invalid">- At least one uppercase letter</p>
                            <p id="lowercase" className="invalid">- At least one lowercase letter</p>
                            <p id="number" className="invalid">- At least one number</p>
                            <p id="special" className="invalid">- At least one special character (@$!%*?&)</p>
                        </div>
                        <div className="form-group">
                            <button type="submit" style={{ backgroundColor: '#007bff' }}>Register</button>
                        </div>
                        <p>Already Register?<Link to='/signin'>Login</Link></p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;
