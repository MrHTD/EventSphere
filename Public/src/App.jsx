import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './signin'
import SignUp from './signup'
import Home from './home'
import ForgetPassword from './forgetpassword'
import EditUser from './Edit/edituser'
import Dashboard from './dashboard'
import { Expos } from './ExhibitorManagement/expos'
import ExpoRegister from './ExhibitorManagement/exporegistration'
import { BoothAllocations } from './ExhibitorManagement/boothAllocations'
// import { ViewBooths } from './ExhibitorManagement/viewbooths'
import ReserveBooth from './ExhibitorManagement/reservebooth'
import { FloorPlan } from './ExhibitorManagement/flooplan'
import { RegisteredEvent } from './ExhibitorManagement/registeredevent'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/myprofile/:id" element={<EditUser />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />

        {/* Exhibitor Routes */}
        <Route path="/registerexpo/:id" element={<ExpoRegister />} />
        {/* <Route path="/viewbooths" element={<ViewBooths />} /> */}
        <Route path="/reservebooth/:id" element={<ReserveBooth />} />
        <Route path="/booths" element={<BoothAllocations />} />
        <Route path="/viewfloorplan" element={<FloorPlan />} />
        <Route path="/registeredevent" element={<RegisteredEvent />} />

        {/* Attendee Routes */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
