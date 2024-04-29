import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './login'
import Register from './register'
import Dashboard from './dashboard'
import { ExpoManagement } from './ExpoManagement/expomanagement'
import { FloorPlan } from './ExpoManagement/floorplan'
import AddExpoEvent from './ExpoManagement/addexpoevent'
import AddFloorPlan from './ExpoManagement/addfloorplan'
import AddBooth from './ExpoManagement/addbooth'
import { Booths } from './ExpoManagement/booths'
import DeleteBooth from './Delete/deletebooth'
import DeleteExpo from './Delete/deleteexpo'
import DeleteFloorPlan from './Delete/deletefloorplan'
import { ExhibitorManagement } from './ExhibitorManagement/exhibitormanagement'
import { Report } from './report'
import { Traffic } from './traffic'
import EditUser from './Edit/edituser'
import ForgetPassword from './forgetpassword'
import ResetPassword from './reset-password'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<Report />} />
        <Route path="/traffic" element={<Traffic />} />
        <Route path="/myprofile/:id" element={<EditUser />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />

        {/* Expo Routes */}
        <Route path="/expo" element={<ExpoManagement />} />
        <Route path="/floorplan" element={<FloorPlan />} />
        <Route path="/booths" element={<Booths />} />
        <Route path="/addevent" element={<AddExpoEvent />} />
        <Route path="/addfloorplan" element={<AddFloorPlan />} />
        <Route path="/addbooth" element={<AddBooth />} />

        {/* Exhibitor Routes */}
        <Route path="/exhibitor" element={<ExhibitorManagement />} />

        {/* Delete Routes */}
        <Route path="/deleteexpoevent/:id" element={<DeleteExpo />} />
        <Route path="/deletefloorplan/:id" element={<DeleteFloorPlan />} />
        <Route path="/deletebooth/:id" element={<DeleteBooth />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
