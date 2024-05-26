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
import DeleteFloorPlan from './Delete/deletefloorplan'
import { ExhibitorManagement } from './ExhibitorManagement/exhibitormanagement'
import { Report } from './Analytics-Reporting/report'
import { Analytics } from './Analytics-Reporting/analytics'
import EditUser from './Edit/edituser'
import ForgetPassword from './forgetpassword'
import ResetPassword from './reset-password'
import EditExpoEvent from './Edit/editexpoevent'
import EditBooth from './Edit/editbooth'
import DeleteExpoEvent from './Delete/deleteexpoevent'
import { SessionManagement } from './ScheduleManagement/sessionmanagement'
import AddSession from './ScheduleManagement/addsession'
import { SeatsReserved } from './ExhibitorManagement/seatsreserved'
import AdminChat from './adminchat'
import ReplyAdminChat from './replychat'
import DeleteSessionSchedule from './Delete/deletesessionchedule'
import EditFloorPlan from './Edit/editfloorplan'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<Report />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/adminchat" element={<AdminChat />} />
        <Route path="/replychat/:id" element={<ReplyAdminChat />} />
        <Route path="/myprofile/:id" element={<EditUser />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />

        {/* Expo Routes */}
        <Route path="/expo" element={<ExpoManagement />} />
        <Route path="/floorplan" element={<FloorPlan />} />
        <Route path="/booths" element={<Booths />} />
        {/* Add */}
        <Route path="/addevent" element={<AddExpoEvent />} />
        <Route path="/addfloorplan" element={<AddFloorPlan />} />
        <Route path="/addbooth" element={<AddBooth />} />
        {/* Expo Routes End */}

        {/* Exhibitor Routes */}
        <Route path="/exhibitor" element={<ExhibitorManagement />} />
        <Route path="/seatsreserved" element={<SeatsReserved />} />
        {/* Exhibitor Routes End */}

        {/* Schedule Routes */}
        <Route path="/session" element={<SessionManagement />} />
        {/* Add */}
        <Route path="/addsession" element={<AddSession />} />
        {/* Schedule Routes End */}

        {/* Edit Routes */}
        <Route path="/editexpoevent/:id" element={<EditExpoEvent />} />
        <Route path="/editbooth/:id" element={<EditBooth />} />
        <Route path="/editfloorplan/:id" element={<EditFloorPlan />} />

        {/* Delete Routes */}
        <Route path="/deleteexpoevent/:id" element={<DeleteExpoEvent />} />
        <Route path="/deletefloorplan/:id" element={<DeleteFloorPlan />} />
        <Route path="/deletebooth/:id" element={<DeleteBooth />} />
        <Route path="/deletesession/:id" element={<DeleteSessionSchedule />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
