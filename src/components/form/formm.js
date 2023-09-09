import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { Autocomplete } from '@mui/material';

const YourForm = ({ onClose }) => {
  // Add your form state and form submission logic here
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    image: null,
    imagePreview: null, 
  });


  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  const handleClose = () => {
    onClose();
  };
  const StyledInputLabel = styled(InputLabel)`
  cursor: pointer;
  padding: 8px 16px;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;
const FileInput = styled.input`

`;
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
const mobileNumberOptions = ['+1', '+218', '+216']; // Example mobile number prefixes

const sexOptions = ['Male', 'Female'];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your form submission logic here
    // For example, send a request to create a new user
    console.log({

      firstName,
      lastName,
      sex,
      age,
      mobile,
      email,
    })
    // After successful form submission, close the form
    handleClose();
  };

  return (
    <Dialog open onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>New User Form</DialogTitle>
      <DialogContent>
      <div className="inline-container">
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          required
        />
      </div>
         <br />
         <br />
         <div className="inline-container">
        <Autocomplete
            options={sexOptions}
            fullWidth
            required
            getOptionLabel={(option) => option}
            value={formData.sex}
            onChange={(event, newValue) => setFormData({ ...formData, sex: newValue })}
            renderInput={(params) => 
          <TextField {...params} label="Sex" 
            fullWidth
            required/>}
        />

      
      
      <TextField
        label="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        fullWidth
        required
      />
      </div>
         <br />
         <br />
         
         <Autocomplete
  options={mobileNumberOptions}
  fullWidth
  required
  getOptionLabel={(option) => option}
  value={formData.mobile}
  onChange={(event, newValue) => setFormData({ ...formData, mobile: newValue })}
  renderInput={(params) => <TextField {...params} label="Mobile Number" />}
/>

      <br/>
      <br/>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
      />
         <br />
         <br />

        <TextField 
        sx={{ mb: 2 }}
         label="Password"
         type="password"
         variant="outlined" 
         fullWidth placeholder="Enter your password"/>
        
        <TextField label="Description" multiline rows={4} variant="outlined" fullWidth placeholder="Enter your description here..."/>
      </DialogContent>
      <div>
      

      <FileInput
        id="image-upload"
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        aria-label="Upload an image"
      />
     
      {/* You can use the selectedImage state to display the selected image or perform further processing */}
      <Button variant="contained" color="primary" disabled={!selectedImage}>
        Upload Image
      </Button>
    </div>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create User
        </Button>
      </DialogActions>
    </Dialog>
  );
};
YourForm.propTypes = {
    onClose: PropTypes.func.isRequired,
  };

export default YourForm;