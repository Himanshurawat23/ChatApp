import React, { useState } from 'react';
import { 
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
  Divider,
  IconButton
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {user} = useSelector((store)=> store.auth);

  const handleChatClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/chat');
      setLoading(false);
    }, 1000);
  };

  return (
    <Box 
      className="flex justify-center items-center min-h-screen"
      sx={{
        background: 'linear-gradient(135deg, #f6f9fc 0%, #e9ecef 100%)',
        padding: { xs: 2, sm: 4 },
        animation: 'fadeIn 0.5s ease-in-out',
        '@keyframes fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }}
    >
      <Card 
        className="w-full max-w-md"
        sx={{
          boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          borderRadius: '24px',
          overflow: 'visible',
          position: 'relative',
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)'
          }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '-80px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '4px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': { boxShadow: '0 0 0 0 rgba(33, 150, 243, 0.4)' },
              '70%': { boxShadow: '0 0 0 10px rgba(33, 150, 243, 0)' },
              '100%': { boxShadow: '0 0 0 0 rgba(33, 150, 243, 0)' },
            },
          }}
        >
          <Avatar
            src={user.image}
            alt={user.username}
            sx={{ 
              width: 140,
              height: 140,
              border: '4px solid white',
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              backgroundColor: 'primary.main',
              fontSize: '3rem'
            }}
          />
        </Box>

        <CardContent 
          sx={{ 
            padding: { xs: 3, sm: 4 },
            paddingTop: '80px',
            mt: 5
          }}
        >
          <Box sx={{ textAlign: 'center', width: '100%' }}>
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                fontWeight: 700,
                mb: 1,
                background: 'linear-gradient(45deg, #1976D2 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px'
              }}
            >
              {user.username}
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 4, 
                fontSize: '1.1rem',
                color: 'text.secondary',
                fontWeight: 500
              }}
            >
              {user.email}
            </Typography>

            <Divider 
              sx={{ 
                my: 4,
                '&::before, &::after': {
                  borderColor: 'primary.light',
                },
              }} 
            />

            <Paper 
              elevation={0} 
              sx={{
                p: 4,
                backgroundColor: 'rgba(245, 247, 250, 0.9)',
                borderRadius: '16px',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(0,0,0,0.05)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                }
              }}
            >
              <Box className="space-y-6">
                <Box 
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <IconButton 
                    sx={{ 
                      backgroundColor: 'primary.light',
                      color: 'primary.main',
                      '&:hover': { backgroundColor: 'primary.main', color: 'white' }
                    }}
                  >
                    <PersonIcon />
                  </IconButton>
                  <Box>
                    <Typography 
                      variant="subtitle2" 
                      color="primary"
                      sx={{ 
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontSize: '0.75rem',
                        mb: 0.5
                      }}
                    >
                      Username
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {user.username}
                    </Typography>
                  </Box>
                </Box>

                <Box 
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <IconButton 
                    sx={{ 
                      backgroundColor: 'primary.light',
                      color: 'primary.main',
                      '&:hover': { backgroundColor: 'primary.main', color: 'white' }
                    }}
                  >
                    <EmailIcon />
                  </IconButton>
                  <Box>
                    <Typography 
                      variant="subtitle2" 
                      color="primary"
                      sx={{ 
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontSize: '0.75rem',
                        mb: 0.5
                      }}
                    >
                      Email
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {user.email}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>

            <LoadingButton
              loading={loading}
              loadingPosition="start"
              startIcon={<ChatIcon />}
              variant="contained"
              onClick={handleChatClick}
              sx={{ 
                mt: 4,
                width: '100%',
                py: 2,
                borderRadius: '12px',
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 600,
                background: 'linear-gradient(45deg, #1976D2 30%, #21CBF3 90%)',
                boxShadow: '0 4px 20px rgba(33, 150, 243, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(33, 150, 243, 0.4)',
                  background: 'linear-gradient(45deg, #1976D2 50%, #21CBF3 100%)',
                },
                '&:active': {
                  transform: 'translateY(1px)',
                }
              }}
            >
              Start Chat
            </LoadingButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;