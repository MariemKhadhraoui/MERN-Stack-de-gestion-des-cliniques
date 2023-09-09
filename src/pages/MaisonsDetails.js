import { Helmet } from 'react-helmet-async';
import React from 'react';

import MaisonsData from '../sections/@dashboard/MaisonView/maisonsData';
import MaisonViewDetails from '../sections/@dashboard/MaisonView/MaisonViewDetails';

export default function MaisonDetail() {
  const maison = MaisonsData[0];
  return (
    <>
      <Helmet>
        <title> Maison View </title>
      </Helmet>
      <MaisonViewDetails maison={maison} />
    </>
  );
}
