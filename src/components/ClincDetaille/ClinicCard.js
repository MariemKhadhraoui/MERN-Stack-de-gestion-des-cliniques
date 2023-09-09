import React from 'react';

const ClinicCard = ({ clinic, onClinicSelect }) => {
  return (
    <div className="clinic-card" onClick={() => onClinicSelect(clinic)}>
      <h3>{clinic.name}</h3>
      <img src={clinic.image} alt={clinic.name} />
    </div>
  );
};

export default ClinicCard;
