import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  ImageList,
  ImageListItem,
  Dialog,
  Stack,
  Typography,
  IconButton,
  Link,
  Checkbox,
  ListItemText,
  Divider,
} from '@mui/material';
import Iconify from '../../../components/iconify';
import Image from '../../../components/image';
import HomeRentalForm from '../../../pages/maps';

export default function MaisonViewContent({ maison }) {
  const {
    titre,
    images,
    ratingNumber,
    bathrooms,
    location,
    
    floor,
   
    maisonSize,
    gendre,
    periode,
    roomsNumb,
    description,
  } = maison;
  const [formData, setFormData] = useState({})

  const [selectedImage, setSelectedImage] = useState(null);
  const handleCloseDialog = () => {
    setSelectedImage(null);
  };
  const updateCoordinates = (lat, lng) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      coordinates: { lat, lng },
    }));
  };
  const handleOpenDialog = (imgUrl) => {
    setSelectedImage(imgUrl);
  };

  const renderGallery = (
    <Box  
    display="flex"
    alignItems="center"
    position="center"
    >
          <Box
           width="40%" 
           maxWidth={800}  
           display ="flex"
           justifyContent= "center" >
        {images.map((imgUrl) => (
          <Image
            src={`${imgUrl}?w=248&fit=crop&auto=format`}
            srcSet={`${imgUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={titre}
            ratio="1/1"
            sx={{ borderRadius: 2, cursor: 'pointer' }}
          />
        ))}
      </Box>


      <Dialog open={!!selectedImage} onClose={handleCloseDialog}>
        {selectedImage && (
          <img src={selectedImage} alt="Enlarged" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
        )}
      </Dialog>
    </Box>
  );
  const renderHead = (
    <>
      <Stack direction="row" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}><br/>
        <br/>
          {titre}
        </Typography>

        <IconButton>
          <Iconify icon="solar:share-bold" />
        </IconButton>

        <Checkbox
          defaultChecked
          color="error"
          icon={<Iconify icon="solar:heart-outline" />}
          checkedIcon={<Iconify icon="solar:heart-bold" />}
        />
      </Stack>

      <Stack spacing={3} direction="row" flexWrap="wrap" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ typography: 'body2' }}>
          <Iconify icon="eva:star-fill" sx={{ color: 'warning.main' }} />
          <Box component="span" sx={{ typography: 'subtitle2' }}>
            {ratingNumber}
          </Box>
          <Link sx={{ color: 'text.secondary' }}>(234 reviews)</Link>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ typography: 'body2' }}>
          <Iconify icon="mingcute:location-fill" sx={{ color: 'error.main' }} />
          {location}
        </Stack>

       
      </Stack>
    </>
  );

  const renderOverview = (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
      }}
    >
      {[
        {
          label: ' Region',
          value: floor,
          icon: <Iconify icon="typcn:location" />,
        },
        {
          label: 'Address',
          value: maisonSize,
          icon: <Iconify icon="entypo:address" />,
        },
      
        {
          label: 'Telephone',
          value: bathrooms,
          icon: <Iconify icon="mdi:phone" />,
        },
        {
          label: ' E-mail',
          value: gendre,
          icon: <Iconify icon="tabler:mail-code" />,
        },
        {
          label: 'DateOuverture',
          value: periode,
          icon: <Iconify icon="uim:calender" />,
        },
        {
          label: 'HorairesOuverture',
          value: periode,
          icon: <Iconify icon="uim:calender" />,
        },

      ].map((item) => (
        <Stack key={item.label} spacing={1.5} direction="row">
          {item.icon}
          <ListItemText
            primary={item.label}
            secondary={item.value}
            primaryTypographyProps={{
              typography: 'body2',
              color: 'text.secondary',
              mb: 0.5,
            }}
            secondaryTypographyProps={{
              typography: 'subtitle2',
              color: 'text.primary',
              component: 'span',
            }}
          />
        </Stack>
      ))}
    </Box>
  );

  const renderContent = (
    <>
      <Typography variant="body1" sx={{ flexGrow: 1 }}>
         <Typography variant="h6"> Description</Typography>
        <br/>
        <br/>
        {description}
      </Typography>
      <br/>
      <br/>
      <Stack spacing={2}>
        <Typography variant="h6"> Localisation</Typography>
      <Stack spacing={1.5} sx={{ p: 3 }}>
              <HomeRentalForm updateCoordinates={updateCoordinates} required />
       </Stack>
       </Stack>
    </>
  );

  return (
    <>
      {renderGallery}

      <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
        {renderHead}

        <Divider sx={{ borderStyle: 'dashed', my: 5 }} />

        {renderOverview}

        <Divider sx={{ borderStyle: 'dashed', my: 5 }} />

        {renderContent}
      </Stack>
    </>
  );
}
MaisonViewContent.propTypes = {
  maison: PropTypes.object,
};
