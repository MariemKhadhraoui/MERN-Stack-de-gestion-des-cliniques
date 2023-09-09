import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClinicCard from './ClinicCard';

const ClinicList = ({ onClinicSelect }) => {
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    // Fetch clinics data from your API endpoint
    axios.get('https://your-api.com/clinics')
      .then((response) => setClinics(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="clinic-list">
      {clinics.map((clinic) => (
        <ClinicCard key={clinic.id} clinic={clinic} onClinicSelect={onClinicSelect} />
      ))}
    </div>
  );
};

export default ClinicList;
