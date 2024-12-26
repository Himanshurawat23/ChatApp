import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Divider,
  Alert,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import videoFile from "../helper/log.mp4";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/auth';
// import { setUser } from '@/redux/auth';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setError('');
  };
  const navigate = useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsLoading(true);
    console.log("himkmakma")
    try {
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }
      if (!isValidEmail(formData.email)) {
        setError('Please enter a valid email address');
        return;
      }
      const res = await axios.post(`${USER_API_END_POINT}/login`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        console.log(res.data.message)
        toast.success(res.data.message, {
          position: "top-right"
        });
        console.log(res.data.user)
        dispatch(setUser(res.data.user))
        // dispatch(setUser(res.data.user))
        setTimeout(() => { navigate('/chat') }, 1000)
      }
    }
    catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.'); // Error toast
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <Box className="min-h-screen flex">
      {/* Left side - Video */}
      <Box className="hidden md:flex w-1/2 relative overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="absolute w-full h-full object-cover"
        >
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Box
          className="absolute inset-0"
          sx={{
            background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1))',
            zIndex: 1
          }}
        />
      </Box>
      <ToastContainer />


      {/* Right side - Login Form */}
      <Box
        className="w-full md:w-1/2 flex items-center justify-center p-4"
        sx={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}
      >
        <Paper
          elevation={3}
          className="w-full max-w-md p-8 space-y-6"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
          }}
        >

          {/* Header */}
          <Box className="text-center space-y-2">
            <Typography
              variant="h4"
              component="h1"
              className="font-bold"
              sx={{ color: '#2c3e50' }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              Please sign in to continue
            </Typography>
          </Box>


          {/* Error Alert */}
          {error && (
            <Alert severity="error" className="w-full">
              {error}
            </Alert>
          )}

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              required
              autoComplete="email"
              error={Boolean(error && !formData.email)}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              required
              error={Boolean(error && !formData.password)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              className="mt-6"
              disabled={isLoading}
              sx={{
                backgroundColor: '#2c3e50',
                '&:hover': {
                  backgroundColor: '#34495e',
                }
              }}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1 }} color="inherit" />
                  Creating account...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>
          {/* Divider */}
          <Box className="flex items-center gap-4">
            <Divider className="flex-1" />
            <Typography variant="body2" color="textSecondary">
              OR
            </Typography>
            <Divider className="flex-1" />
          </Box>

          {/* Sign Up Link */}
          <Typography variant="body2" align="center" className="pt-4">
            Don't have an account?{' '}
            <Link
              href="signup"
              underline="hover"
              sx={{ color: '#2c3e50' }}
            >
              Sign up
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;