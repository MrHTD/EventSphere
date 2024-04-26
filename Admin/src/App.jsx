import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './login'
import Register from './register'
import Dashboard from './dashboard'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
