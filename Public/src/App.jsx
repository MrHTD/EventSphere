import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignIn from './signin'
import SignUp from './signup'
import Home from './home'
import ForgetPassword from './forgetpassword'
import EditUser from './Edit/edituser'
import Dashboard from './dashboard'

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
      </Routes>
    </BrowserRouter>
  )
}

export default App
