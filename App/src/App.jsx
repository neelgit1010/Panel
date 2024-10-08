import { useState } from 'react';
import Login from './components/Login'
import Register from './components/Register'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard';

function App() {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login showPassword={showPassword} setShowPassword={setShowPassword}>  </Login>} />
        <Route path="/register" element={<Register showPassword={showPassword} setShowPassword={setShowPassword}/>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
