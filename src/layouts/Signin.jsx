import React from "react";
import "../styles/SignIn.css";
import { useForm } from 'react-hook-form'
import { toast, ToastContainer, Bounce } from 'react-toastify'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const submithandler = async (data) => {
    console.log(data)
    const res = await axios.post("/signIn", data)
    console.log(res)

    //login success
    if (res.status == 200) {
      localStorage.setItem('id', res.data.data._id)
      localStorage.setItem('role', res.data.data.role.name)
      setTimeout(() => {
        toast.success('Login successfull!', {
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
      }, 100)

      if (res.data.data.role.name === 'donor') {
        navigate('/user')
      } else if(res.data.data.role.name === 'ngo' ) {
        navigate('/ngo')
      }else{
        navigate('/v')
      }

    }

    //login failed
    if (res.status == 202) {
      toast.error(res.data.message, {
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
    email: {
      required: {
        value: true,
        message: "*"
      }
    },
    password: {
      required: {
        value: true,
        message: '*'
      }
    }
  }

    return (
        <>
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
            {/* <Navbar /> */}
            <div className="signin-container">
                <form className="signin-form" onSubmit={handleSubmit(submithandler)}>
                    <h2>Sign In</h2>
                    <input type="email" placeholder="Email" {...register('email', validation.email)}/><span style={{ color: 'red' }}>{errors.email?.message}</span>
                    <input type="password" placeholder="Password" {...register('password', validation.password)}/><span style={{ color: 'red' }}>{errors.password?.message}</span>
                    <button type="submit">Sign In</button>
                    <p>New User?<Link to="/signup">Register</Link></p>
                </form>
            </div>
        </>
    );
};

export default SignIn;
