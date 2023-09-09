import React, { useCallback , useState } from 'react';
import { Container} from '@mui/material';
import {useSettingsContext} from '../../../components/settings';

import MaisonViewToolBar from './MaisonViewToolBar';
import MaisonViewContent from './MaisonViewContent';

// You can customize the styles of the card as per your requirement

const MaisonViewDetails = (array) => {
  const house = array.house;
  const settings = useSettingsContext();
  const [publish, setPublish] = useState(house.publish);
  const handleChangePublish = useCallback((newValue) => {
    setPublish(newValue);
  }, []);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <MaisonViewToolBar backLink={array} editLink publish={publish} onChangePublish={handleChangePublish} />
        <MaisonViewContent maison={house} />
      </Container>
    </>
  );
};

export default MaisonViewDetails;

