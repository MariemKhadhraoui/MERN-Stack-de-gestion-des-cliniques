import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { TextField,Stack, Typography, Avatar,FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import '../Patient/AddDocotrs.css'; 
import HomeRentalForm from '../../pages/maps';

const ClinicForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nom: '',
    adresse: '',
    code_postale: '',
    pays: '',
    email: '',
    ville: '',
    numtelephone: '',
    description: '',
    id_directeur: '',
    image: null, // Utilisez null pour représenter l'absence d'image au départ
    latitude: '',
    longitude: '',
    dateOuverture: '',
    horairesOuvertureL: '',
  });
  const updateCoordinates = (lat, lng) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      coordinates: { lat, lng },
    }));
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    
    
  };
  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setFormData({ ...formData, image: selectedImage });

    // Create a preview for the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, imagePreview: reader.result });
    };
    reader.readAsDataURL(selectedImage);

  };
  const handleClose = () => {
    onClose();
  }


  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formDataToSend = new FormData();

    // Transférez toutes les valeurs du formulaire dans formDataToSend
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    
  
    try {
      const response = await axios.post('http://localhost:5000/api/clinique/add', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(response.data.message);

  // Réinitialisez le formulaire après un ajout réussi
  setFormData({
    nom: '',
    adresse: '',
    code_postale: '',
    pays: '',
    email: '',
    ville: '',
    numtelephone: '',
    description: '',
    id_directeur: '',
    image: null,
    latitude: '',
    longitude: '',
    dateOuverture: '',
    horairesOuvertureL: '',
  });


} catch (error) {
   if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      console.log('Axios Error:', error.message);
      console.log('Response Status:', error.response?.status);
      console.log('Response Data:', error.response?.data);
    } else {
      // Handle other errors
      console.error('An error occurred:', error.message);
    }
  }

};
  
  return (
    <Dialog open onClose={handleClose} fullWidth maxWidth="sm">
    <DialogTitle>New Clinic Form</DialogTitle>
    <DialogContent>
      <TextField
        label="Clinic Name"
        name="nom"
        value={formData.nom}
        onChange={handleChange}
        fullWidth
        required
      />
      
      <br />
      <br />
      
        
      <TextField
        label="Address"
        name="adresse"
        value={formData.adresse}
        onChange={handleChange}
        fullWidth
        required
      />
      
      <br/>
      <br/>
      <TextField
        label="codePostal"
        name="code_postale"
        value={formData.code_postale}
        onChange={handleChange}
        fullWidth
        required
      />
      <br />
      <br />
      <TextField
        label="telephone "
        name="numtelephone"
        value={formData.numtelephone}
        onChange={handleChange}
        fullWidth
        required
      />
      <br />
      <br />
      <TextField
        label="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
      />
      <br />
      <br />
      
      <FormControl fullWidth>
        <InputLabel id="region-label">Region</InputLabel>
        <Select
          labelId="region-label"
          name="region"
          value={formData.region}
          onChange={handleChange}
          required
        >
          <MenuItem value="Tunis">Tunis</MenuItem>
          <MenuItem value="Sousse">Sousse</MenuItem>
          <MenuItem value="Sfax">Sfax</MenuItem>
          {/* Add more regions as needed */}
        </Select>
      </FormControl>
      <br />
      <br />
        
      <TextField
        label="dateOuverture"
        type="Date"
        name="dateOuverture"
        value={formData.dateOuverture}
        onChange={handleChange}
        fullWidth
        required
      />
      <br />
      <br />
      <TextField
        label="horairesOuvertureL"
        type="Time"
        name="horairesOuvertureL"
        value={formData.horairesOuvertureL}
        onChange={handleChange}
        fullWidth
        required
      />
      <br />
      <br />
      */
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        required
      />
      <br />
      <br />
      <Stack spacing={1.5} sx={{ p: 3 }}>
              <Typography variant="subtitle2">location</Typography>
              <HomeRentalForm updateCoordinates={updateCoordinates} required />
            </Stack>
            <br/>
            <br/>

      </DialogContent>
      <div>
        {formData.imagePreview ? (
          <Avatar src={formData.imagePreview} alt="Avatar" sx={{ width: 100, height: 100 }} />
        ) : (
      

          <Avatar sx={{ width: 100, height: 100 }}>Avatar</Avatar>
        )}
        <br/>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
         <br />
         <br />
      <DialogActions>
      <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create New Clinic
        </Button>
      </DialogActions>
     </Dialog>
  );
};
ClinicForm.propTypes ={
  onclose: PropTypes.func.isRequired,
}

export default ClinicForm;
