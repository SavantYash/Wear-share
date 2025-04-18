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


function App() {
  axios.defaults.baseURL = "http://localhost:5000"

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<ProfileView />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="" element={<PrivateRoutes />}>

        {/* admin routes */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* donor modules */}
        <Route path="/user" element={<Home />}>
          <Route path="donations" element={<DonorDonations />} />
          <Route path="addclothes" element={<AddClothes />} />
          <Route path="requests" element={<DonorRequests />} />
        </Route>

        {/* ngo modules */}
        <Route path="/ngo" element={<NgoHome />}>
          <Route path="donations" element={<NgoDonations />} />
          <Route path="requests" element={<NgoRequests />} />
        </Route>

        {/* volunteer modules */}
        <Route path="/v" element={<VolunteerHome />}>
          <Route path="requests" element={<VolunteerRequests />} />
          <Route path="accepted" element={<Accepted />} />
        </Route>

      </Route>
    </Routes>
  )
}

export default App
