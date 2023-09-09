import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

const MAISON_TITLES = [
  'Polyclinique CHAMS',
  'Polyclinique IBN ANNAFIS ',
  'Clinique ZITOUNA ',
  'Clinique SYPHAX',
  'Polyclinique SFAX MEDINA',
  'Clinique OMAR',
  'Clinique IBN KHALDOUN',
  'Clinique ESSALAMA',
  'Clinique ALIA',
];
const region =[
   'sfax',
   'sfax',
   'sfax',
   'sfax',
   'sfax',
   'sfax',
   'sfax',
   'sfax',
   'sfax',
]

const MAISON_LOCATIONS = ['Sfax, Tunisie'];

const   adresse= [
  'ROUTE DE GREMDA-Km 3,5 - SFAX',
  'ROUTE DE TUNIS-Km 3,5 - SFAX',
  '65 AV DES MARTYRS-SFAX',
  'ROUTE  GREMDA Km2 CP 3032',
  'AV DE LA LIBERTE,RUE AHMED ALOULOU 3027 SFAX',
  'ROUTE EL AIN KM 9/SFAX',
  'ROUTE GREMDA Km3 CP 3000',
  'Av.des Martyrs BAB JEBLI- 3003 SFAX',
  'ROUTE EL AIN KM 2 -SFAX',
];
const tel =[
  '74 217 000',
  '74 215 333',
  '74 220 061',
  '74 261 000',
  '74 416 000',
  '74 401 909',
  '74 619 000',
  '74 492 224',
  '74 462 000',
];

const Maisons = [...Array(9)].map((_, index) => {
  const setIndex = index + 1;
  const imageCount = faker.datatype.number(1); // Random number of images per property
  return {
    titre: MAISON_TITLES[index],
    description: faker.lorem.paragraph(),
    images: [...Array(imageCount)].map((_, imgIndex) => `/assets/images/Clinic/clinic_${setIndex}.jpg`),
    region: region[index],
    tel : tel[index],
    location: sample(MAISON_LOCATIONS),
    coordinates: { lat: faker.address.latitude(), lng: faker.address.longitude() },
    adresse: sample(adresse),
   
    ratingNumber: faker.datatype.number({ min: 1, max: 5 }),
   
  };
});

export default Maisons;
