import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './login'
import Register from './register'
import Dashboard from './dashboard'
import Test from './test'
import { ExpoManagement } from './ExpoManagement/expomanagement'
import { FloorPlan } from './ExpoManagement/floorplan'
import AddExpoEvent from './ExpoManagement/addexpoevent'
import AddFloorPlan from './ExpoManagement/addfloorplan'
import AddBooth from './ExpoManagement/addbooth'
import { Booths } from './ExpoManagement/booths'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/table" element={<Test/>}/>

      {/* Expo Routes */}
      <Route path="/expo" element={<ExpoManagement/>}/>
      <Route path="/floorplan" element={<FloorPlan/>}/>
      <Route path="/booths" element={<Booths/>}/>
      <Route path="/addevent" element={<AddExpoEvent/>}/>
      <Route path="/addfloorplan" element={<AddFloorPlan/>}/>
      <Route path="/addbooth" element={<AddBooth/>}/>

    </Routes>
  </BrowserRouter>
  )
}

export default App
