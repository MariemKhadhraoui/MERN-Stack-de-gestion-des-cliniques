import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const SERVICE_NAME = [
  'Carcinologie',
  'Neurologie',
  'Pneumologie',
  'Gastro-entérologie',
  'Cardiologie',
   'Gyneco-obstetrique',
  'Chirurgie esthétique',
  'Chirurgie maxillo-faciale',
  'Chirurgie ORL',
  'Chirurgie ophtalmologique',
  'La neurochirurgie',
  'Chirurgie orthopédique',
  'Chirurgie urologique',
  'Chirurgie générale',
  'Chirurgie thoracique et cardio-vasculaire',
  
];
const SERVICE_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];

// ----------------------------------------------------------------------

const SERVICE = [...Array(14)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: `/assets/images/products/SERVICE_${setIndex}.jpg`,
    name: SERVICE_NAME[index],
    colors:
      (setIndex === 1 && SERVICE_COLOR.slice(0, 2)) ||
      (setIndex === 2 && SERVICE_COLOR.slice(1, 3)) ||
      (setIndex === 3 && SERVICE_COLOR.slice(2, 4)) ||
      (setIndex === 4 && SERVICE_COLOR.slice(3, 6)) ||
      (setIndex === 23 && SERVICE_COLOR.slice(4, 6)) ||
      (setIndex === 24 && SERVICE_COLOR.slice(5, 6)) ||
      SERVICE_COLOR,
    
      
  };
});

export default SERVICE;
