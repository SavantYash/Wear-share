import { Route, Routes } from "react-router-dom"
import axios from "axios"
import { Welcome } from "./layouts/Welcome"
import SignIn from "./layouts/Signin"
import SignUp from "./layouts/Signup"
import { DonorDonations } from "./components/Donor/Donations"
import { NgoDonations } from "./components/Ngo/Donations"
import { AddClothes } from "./components/Donor/AddClothes"
import { Home } from "./components/Donor/DonorHome"
import { DonorRequests } from "./components/Donor/Requests"
import { NgoRequests } from "./components/Ngo/Requests"
import { NgoHome } from "./components/Ngo/NgoHome"
import { VolunteerHome } from "./components/Volunteer/VolunteerHome"
import { VolunteerRequests } from "./components/Volunteer/Requests"
import { Accepted } from "./components/Volunteer/Accepted"
import ProfileView from "./layouts/Profile"
import { Dashboard } from "./layouts/Dashboard"
import { AdminDashboard } from "./layouts/AdminDashboard"
import PrivateRoutes from "./hooks/PrivateRoutes"
import { AdminHome } from "./components/Admin/Home"
import { DonorDisplay } from "./components/Admin/DonorDisplay"
import { NgoDisplay } from "./components/Admin/NgoDisplay"
import { Tracking } from "./components/Volunteer/Tracking"
import { Donations } from "./layouts/Donations"
import { useEffect, useState } from "react"
import { UploadPic } from "./components/Ngo/UploadPic"
import { DetailsOfDelivered } from "./layouts/DetailsOfDelivered"
import ForgotPassword from "./layouts/ForgotPassword"
import ResetPassword from "./layouts/ResetPassword"
import { VolunteerDisplay } from "./components/Admin/VolunteerDisplay"
import { DonationHistory } from "./components/Admin/DonationHistory"


function App() {
  axios.defaults.baseURL = "http://localhost:5000"

  const [userEmail, setUserEmail] = useState(null); // Set up state to store the user's email

  useEffect(() => {
    axios
      .get("/getProfileById/" + localStorage.getItem("id"))
      .then((res) => {
        setUserEmail(res.data.data.email); // Set userEmail once the data is fetched
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<ProfileView />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword/:token" element={<ResetPassword />} />

      {/* <Route
        path="/chat"
        element={userEmail ? <SendMessage userEmail={userEmail} /> : <div>Loading...</div>}
      /> */}

      <Route path="" element={<PrivateRoutes />}>

        {/* admin routes */}
        <Route path="/admin" element={<AdminHome />}>
          <Route index element={<AdminDashboard />} />
          <Route path="donors" element={<DonorDisplay />} />
          <Route path="ngos" element={<NgoDisplay />} />
          <Route path="volunteer" element={<VolunteerDisplay />} />
          <Route path="donations" element={<DonationHistory />} />
        </Route>

        {/* donor modules */}
        <Route path="/user" element={<Home />}>
          <Route path="donations" element={<Donations />} />
          <Route index element={<AddClothes />} />
          <Route path="requests" element={<DonorRequests />} />
          <Route path="details/:id" element={<DetailsOfDelivered />} />
        </Route>

        {/* ngo modules */}
        <Route path="/ngo" element={<NgoHome />}>
          <Route index element={<NgoDonations />} />
          <Route path="requests" element={<NgoRequests />} />
          <Route path="history" element={<Donations />} />
          <Route path="upload/:id" element={<UploadPic />} />
        </Route>

        {/* volunteer modules */}
        <Route path="/v" element={<VolunteerHome />}>
          <Route index element={<VolunteerRequests />} />
          <Route path="accepted" element={<Accepted />} />
          <Route path="track/:id" element={<Tracking onAction={true} />} />
          <Route path="donations" element={<Donations />} />
          <Route path="details/:id" element={<DetailsOfDelivered />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
