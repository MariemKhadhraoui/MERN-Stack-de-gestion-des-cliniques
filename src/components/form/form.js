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


const YourFormComponent = ({ onClose }) => {
  // Add your form state and form submission logic here
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



  const handleSubmit = () => {
    // Add your form submission logic here
    // For example, send a request to create a new user

    // After successful form submission, close the form
    handleClose();
  };

  return (
    <Dialog open onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>New User Form</DialogTitle>
      <DialogContent>
        <TextField label="Service" sx={{ mb: 2 }} fullWidth />
        <TextField label="Service manager" sx={{ mb: 2 }} fullWidth />
        <TextField label="Num_Tel" sx={{ mb: 2 }} fullWidth />
        <TextField label="Mail_Manager"  sx={{ mb: 2 }} fullWidth />
        <TextField sx={{ mb: 2 }}  label="Password"type="password"variant="outlined" fullWidth placeholder="Enter your password"/>
        <TextField label="Description" multiline rows={4} variant="outlined" fullWidth placeholder="Enter your description here..."/>
      </DialogContent>
      <div>
      <StyledInputLabel htmlFor="image-upload" component="span">
        Select an image
      </StyledInputLabel>
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
YourFormComponent.propTypes = {
    onClose: PropTypes.func.isRequired,
  };

export default YourFormComponent;