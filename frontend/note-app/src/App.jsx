import React from 'react'
import Home from './pages/Home/Home'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'

const routes=(
  <Router>
    <Routes>
    <Route exact path="/dashboard" element={<Home />} />
    <Route exact path="/login" element={<Login />} />
    <Route exact path="/signup" element={<Signup />} />
    {/* Add more routes here */}
    </Routes>
  </Router>
)
const App = () => {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App
