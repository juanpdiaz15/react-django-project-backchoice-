import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios'; // Si necesitas hacer llamadas a tu backend

const SignInWithGoogleButton = () => {
  const handleGoogleLogin = async () => {
    try {
      // Realiza una solicitud a tu backend para obtener la URL de inicio de sesión de Google
      const response = await axios.get('http://localhost:8000/api/google/login');
      // Redirige al usuario a la URL de inicio de sesión de Google
      window.location.href = response.data.login_url;
    } catch (error) {
      console.error('Error fetching Google login URL:', error);
    }
  };

  return (
    <Button variant="contained" onClick={handleGoogleLogin}>
      Sign In with Google
    </Button>
  );
};

export default SignInWithGoogleButton;
