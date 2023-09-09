import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';
import { NewHouseForm } from '../sections/@dashboard/NewHouse';

const CreateHouse = () => {
  return (
    <>
      <Helmet>
        <title>Creer noveau maison</title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Creer Nouveau Maison
        </Typography>
      </Container>

      <NewHouseForm />
    </>
  );
};

export default CreateHouse;
