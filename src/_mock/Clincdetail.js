import faker from "faker";
import { sample } from "lodash";

//------------------------------------------------------------

const ClinicDetail = () => {
    useState({

    name: faker.company.companyName(),
    region: faker.address.state(),
    address: faker.address.streetAddress(),
    image: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    codePostal: faker.address.zipCode(),
    telephone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    dateOuverture: faker.date.past().toLocaleDateString(),
    horairesOuverture: `${faker.time.recent()} - ${faker.time.recent()}`,
    description: faker.lorem.paragraphs(),
    services: [], // Assuming this is the correct field name for services options
  })};

  

export default ClinicDetail;
