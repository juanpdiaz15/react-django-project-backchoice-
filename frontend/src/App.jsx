import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Box from '@mui/material/Box';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import ProtectedPage from './pages/NotFound';
import PrivateRoute from './pages/PrivateRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/protected" element={<ProtectedPage />}>
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App