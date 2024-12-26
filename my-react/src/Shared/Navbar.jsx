import React, { useState } from 'react';
import {
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Typography,
  Divider,
  ListItemIcon,
} from '@mui/material';
import {
  AccountCircle as User,
  Logout as LogOut,
  Settings,
  Notifications as Bell,
} from '@mui/icons-material';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast , ToastContainer} from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/auth';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ChatLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-10 h-10">
    <defs>
      <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#6366F1"}}/>
        <stop offset="100%" style={{stopColor:"#4F46E5"}}/>
      </linearGradient>
      
      <linearGradient id="bubbleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#FFFFFF"}}/>
        <stop offset="100%" style={{stopColor:"#F3F4F6"}}/>
      </linearGradient>
      
      <filter id="shadow">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
        <feOffset dx="2" dy="2"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.3"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <circle cx="100" cy="100" r="90" fill="url(#backgroundGradient)"/>
    <circle cx="100" cy="100" r="85" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2"/>
    <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1"/>
    
    <path d="M65 75 C65 55 80 40 100 40 C120 40 135 55 135 75 C135 90 125 102 110 107 L100 125 L90 107 C75 102 65 90 65 75 Z" 
          fill="url(#bubbleGradient)"
          filter="url(#shadow)"/>
    
    <path d="M110 90 C110 80 120 72 132 72 C144 72 154 80 154 90 C154 98 148 105 140 108 L132 118 L124 108 C116 105 110 98 110 90 Z" 
          fill="url(#bubbleGradient)"
          filter="url(#shadow)"
          transform="rotate(-15, 132, 95)"/>
    
    <circle cx="85" cy="75" r="4" fill="#6366F1"/>
    <circle cx="100" cy="75" r="4" fill="#6366F1"/>
    <circle cx="115" cy="75" r="4" fill="#6366F1"/>
  </svg>
);

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      console.log("logout")
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      console.log(res)
      if(res.data.success){
        toast.success(res.data.message,{
          position: "top-right",
        });
        dispatch(setUser(null))
        setTimeout( () => {navigate('/login')},1000)
    }
  }
    catch(err){
      toast.error(err.response?.data?.message)
    }
  }
  const handleProfile = () => { 
    navigate('/profile')
  }
  
  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 py-2 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" >
        <div className="flex items-center space-x-2">
          <ChatLogo />
          <Typography variant="h6" className="font-semibold text-gray-800">
          ChatFlow
          </Typography>
        </div>
        </Link>
        <ToastContainer/>

        {/* Right side items */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <IconButton
            size="medium"
            className="hover:bg-gray-100 rounded-full"
          >
            <Bell />
          </IconButton>

          {/* Profile Menu */}
          <IconButton
            onClick={handleClick}
            size="small"
            className="focus:outline-none"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar 
              src="/api/placeholder/32/32" 
              alt="Profile picture"
              sx={{ width: 32, height: 32 }}
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: {
                width: 220,
                mt: 1,
                '& .MuiMenuItem-root': {
                  px: 2,
                  py: 1,
                },
              },
            }}
          >
            <MenuItem disabled>
              <Typography variant="subtitle2">My Account</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleProfile}>
              <ListItemIcon>
                <User fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem sx={{ color: 'error.main' }} onClick={handleLogout}>
              <ListItemIcon>
                <LogOut fontSize="small" color="error" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;