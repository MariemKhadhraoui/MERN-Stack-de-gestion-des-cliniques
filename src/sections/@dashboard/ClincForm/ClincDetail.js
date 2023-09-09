import React, { useState } from 'react';
import ClinicForm from '../../../components/ClincForm/ClincForm';
import ClinicDetails from '../../../components/ClincDetaille/ClinicDetails';

const ClincDetail = () => {
    const [clinicData, setClinicData] = useState({
      name: 'Polyclinque CHAMS',
      region: 'Tunis',
      address: '123 Main Street',
      codePostal: '12345',
      telephone: '555-123-4567',
      email: 'info@example.com',
      dateOuverture: '2023-08-02',
      horairesOuverture: '09:00 AM - 05:00 PM',
    });
    const [isEditing, setIsEditing] = useState(false);
  
    const handleEdit = () => {
      setIsEditing(true);
    };
  
  return (
    <div>
      { (
        <ClinicDetails clinicData={clinicData} onEdit={handleEdit} />
      )}
    </div>
  );
};

export default ClincDetail;
