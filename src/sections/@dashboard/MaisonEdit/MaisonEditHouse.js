import React , { useSettingsContext } from 'react';
import { Container } from '@mui/material';
import NewHouseForm from '../NewHouse/NewHouseForm';

const MaisonEditHouse = (array) => {
  const house = array.house;
  const settings = useSettingsContext();
  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <NewHouseForm currentMaison={house} />
      </Container>
    </>
  );
};

export default MaisonEditHouse;
