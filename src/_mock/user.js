import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------
const company = [
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
const users = [...Array(5)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  company: company[index],
  isVerified: faker.datatype.boolean(),
  status: sample(['active']),
  role: sample([
    'Directeur Clinque ',
  ]),
}));

export default users;
