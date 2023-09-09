import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
import ClinicForm from '../components/ClincForm/ClincForm';

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',

  padding: theme.spacing(12, 0),
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'blue',


  // Adjust the spacing
  marginTop: theme.spacing(4),
}));


const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(-8.5), // Adjust the spacing between the form and button
  backgroundColor: '#007BFF',
  
  color: '#FFF',
  '&:hover': {
    backgroundColor: 'blue'


  },
  
}));

export default function Page404() {
  return (
    <>
      <Helmet>
        <title> Add Clinic | Minimal UI </title>
      </Helmet>

      <StyledContent>

        <StyledContainer>
          <StyledButton
            to="/"
            size="petit"
            variant="contained"
            backgroundColor= '#f5f5f5'
             padding=' 4'
              borderRadius=' 8 '
            component={RouterLink}
          >
            Go to Home
          </StyledButton>
        </StyledContainer>
      </StyledContent>
    </>
  );
}
