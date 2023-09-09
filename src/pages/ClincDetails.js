import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
import ClinicDetails from '../components/ClincDetaille/ClinicDetails';
import ClincDetail from '../sections/@dashboard/ClincForm/ClincDetail';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <> 
      <Helmet>
        <title> Clinc Detail| Minimal UI </title>
      </Helmet>

        
     < ClincDetail/>          
      
    </>
  );
}
