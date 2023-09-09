import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { TextField, Button ,Avatar, Autocomplete} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import './AddDocotrs.css'; // Assuming you have a CSS file for styling

const AddDocotrs = ({onClose })=> {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [remarks, setRemarks] = useState('');
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    // Your state variables...
    image: null,
    imagePreview: null, // State variable to hold the image preview
    bloodGroup: '',
  });
 
  const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const sexOptions = ['Male', 'Female'];

  
  const mobileNumberOptions = ['+1', '+218', '+216']; // Example mobile number prefixes
 
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can access all the form data in the state variables
    console.log({
      firstName,
      lastName,
      sex,
      age,
      bloodGroup,
      mobile,
      email,
      address,
      city,
      state,
      remarks,
      image,
     });
     handleClose();

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

  return (
    <Dialog open onClose={handleClose} fullWidth maxWidth="sm">
    <DialogTitle>New Pharmacist Form</DialogTitle>
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
         
         <div className="inline-container">
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
     
     <Autocomplete
         options={bloodGroupOptions}
         fullWidth
         required
         getOptionLabel={(option) => option}
         value={formData.bloodGroup}
         onChange={(event, newValue) => setFormData({ ...formData, bloodGroup: newValue })}
         renderInput={(params) =>
         <TextField {...params}
            label="Blood Group"  
            fullWidth
            required/>}
       />

      </div>
         <br />
         <br />
        
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
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        required
      />
         <br />
         <br />
      <TextField
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        fullWidth
        required
      />
    
         <br />
         <br />
      <TextField
        label="Remarks"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        fullWidth
        required
        multiline
    
        rows={4}
      />
         <br />
         <br />
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
          Create New Pharmacist
        </Button>
      </DialogActions>
            </Dialog>
  );
};
AddDocotrs.propTypes ={
  onclose: PropTypes.func.isRequired,
}

export default  AddDocotrs;
