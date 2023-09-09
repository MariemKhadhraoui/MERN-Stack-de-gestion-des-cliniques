import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Link } from 'react-router-dom'; // Import useHistory from React Router

const clinics = [
  {
    id: 1,
    name:  'Polyclinique CHAMS',
    region: 'SFAX',
    address: 'ROUTE DE GREMDA-Km 3,5 - SFAX',
    image: 'cover_1.jpg',
    Tel: '74 217 000   ',
  },
  {
    id: 2,
    name: 'Polyclinique IBN ANNAFIS ',
    region: 'SFAX',
    address: 'ROUTE DE TUNIS-Km 3,5 - SFAX',
    image: 'clinic2.jpg',
    Tel: '74 215 333', },
  {
    id: 3,
    name: 'Clinique ZITOUNA ',
    region: 'SFAX',
    address: '65 AV DES MARTYRS-SFAX',
    image: 'clinic3.jpg',
    Tel: '74 220 061',
  },
  {
    id: 4,
    name: 'Clinique SYPHAX',
    region: 'SFAX',
    address: 'ROUTE  GREMDA Km2 CP 3032',
    image: 'clinic3.jpg',
    Tel: '74 261 000',
  },
  {
    id: 5,
    name: 'Polyclinique SFAX MEDINA',
    region: 'SFAX',
    address: 'AV DE LA LIBERTE,RUE AHMED ALOULOU 3027 SFAX',
    image: 'clinic3.jpg',
    Tel: '74 416 000',
  },{
    id: 6,
    name: 'Clinique OMAR',
    region: 'SFAX',
    address: 'ROUTE EL AIN KM 9/SFAXt',
    image: 'clinic3.jpg',
    Tel: ' 74 401 909',
  },{
    id: 7,
    name: 'Clinique IBN KHALDOUN',
    region: 'SFAX',
    address: 'ROUTE GREMDA Km3 CP 3000',
    image: 'clinic3.jpg',
    Tel: '74 619 000',
  },
  {
      id: 8,
      name: 'Clinique ESSALAMA',
      region: 'SFAX',
      address: 'Av.des Martyrs BAB JEBLI- 3003 SFAX',
      image: 'clinic3.jpg',
      Tel: '74 492 224',
  },
  {
    id : 8,
    name: 'Clinique ALIA',
    region: 'SFAX',
    address: ' ROUTE EL AIN KM 2 -SFAX',
    image: 'clinic3.jpg',
    Tel: '74 462 000',
  },

  // Add more clinics as needed
];


const ClinicSelect = () => {
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Adress</TableCell>
            <TableCell>Tel</TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {clinics.map((clinic) => (
            <TableRow key={clinic.id}>
              <TableCell>
                {/* Use the Link component to navigate to the clinic details */}
                <Link to={`/ClincDetails`}>{clinic.name}</Link>
                
              </TableCell>
              <TableCell>{clinic.region}</TableCell>
              <TableCell>{clinic.address}</TableCell>
              <TableCell>{clinic.Tel}</TableCell>
            </TableRow>
          ))}
            
        </TableBody>
      </Table>
    </div>
  );
};

export default ClinicSelect;