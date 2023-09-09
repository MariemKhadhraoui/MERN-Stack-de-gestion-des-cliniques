import React from 'react';
import { useParams } from 'react-router-dom';
import { Image } from '@material-ui/icons';

const ClinicDetail = ({ clinics }) => {
  const { clinicId } = useParams();

  const selectedClinic = clinics.find(clinic => clinic.id.toString() === clinicId);

  if (!selectedClinic) {
    return <div> Clinic not found!</div>;
  }

  return (
    <div>
      <h1>Clinc ALIA</h1>
      <Image src="./ibnnafis.jpg" alt="Image" width={500} height={300} />
    </div>
  );
};

export default ClinicDetail;
