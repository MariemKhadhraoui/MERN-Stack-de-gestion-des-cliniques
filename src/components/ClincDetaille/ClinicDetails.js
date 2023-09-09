import React from 'react';
import { Typography, Card, CardMedia, CardContent, Grid, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Clincimage from './ibnnafis.jpg';



const useStyles = makeStyles((theme) => ({
  // Styles for the card root
 
  // Styles for the image container
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: theme.spacing(1),
    width: '100%',
    paddingTop: '75%', // 4:3 aspect ratio for larger screens
  },
  // Styles for the image
  media: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: theme.spacing(1),
    transition: 'transform 0.3s ease', // Add transition for zoom-in effect on image
    '&:hover': {
      transform: 'scale(1.1)', // Zoom-in effect on image hover
    },
  },
  // Styles for the clinic name
  clinicName: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    opacity: 0, // Hide the clinic name initially
    transition: 'opacity 0.3s ease', // Add transition for fade-in effect
    '&.show': {
      opacity: 1, // Show the clinic name on hover
    },
  },
  // Styles for the description
  description: {
    fontStyle: 'italic',
    marginTop: theme.spacing(2),
  },
  // Styles for the edit button
  editButton: {
    backgroundColor: theme.palette.primary.main,
    marginTop :'100px',
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const ClinicDetails = ({ clinicData, onEdit }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <div className={classes.imageContainer}>
          {/* Insert your image here */}
          <CardMedia
            className={classes.media}
            image={Clincimage}
            title="Your Image Title"
          />
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card className={classes.cardRoot}>
          <CardContent>
            <Typography variant="h4" gutterBottom className={`${classes.clinicName} show`}>
              {clinicData.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Address: {clinicData.address}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Region: {clinicData.region}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Postal Code: {clinicData.codePostal}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Telephone: {clinicData.telephone}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Email: {clinicData.email}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Opening Date: {clinicData.dateOuverture}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Opening Hours: {clinicData.horairesOuverture}
            </Typography>
          
            <Grid container justifyContent="space-between">
              <Grid item>
                <Button variant="contained" className={classes.editButton} onClick={onEdit}>
                  Edit
                </Button>
              </Grid>
              <Grid 
                      marginTop ='100px' 
                      justifyContent= 'center'>
                <Button  variant="contained" color="primary" component={Link} to="/">
                  Go to Home
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ClinicDetails;
