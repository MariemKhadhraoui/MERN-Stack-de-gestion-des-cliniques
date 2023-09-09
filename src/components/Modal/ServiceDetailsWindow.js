import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import "./Modal.css";
import { styled } from '@mui/material/styles';
// Make sure to set the app element for accessibility
Modal.setAppElement('#root');
//--------------------------------------------------------
const customModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      maxWidth: '500px',
      width: '90%',
    height:'500px',
      maxHeight: '90vh',
      overflow: 'auto',
    },
  };
  const StyledProductImg = styled('img')({
    top: 0,
    width: '40%',
    height: '40%',
    objectFit: 'cover',
 
  });
  //----------------------------------------------------

const ServiceDetailsWindow = ({ product,onClose }) =>
 (
    
    <Modal isOpen onRequestClose={onClose} style={customModalStyles}>
          <StyledProductImg  alt={product.name} src={product.cover} />
      <h2>{product.name}</h2>
      <p>{product.price}</p>


    </Modal>
  );
ServiceDetailsWindow.propTypes = {
    product: PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.isRequired,
      cover: PropTypes.string.isRequired,  // Additional prop types for service object if needed
    }).isRequired,
    
    onClose: PropTypes.func.isRequired,
  };
export default ServiceDetailsWindow;