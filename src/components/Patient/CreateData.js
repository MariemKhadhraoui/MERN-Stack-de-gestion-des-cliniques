const fs = require('fs');

// Sample user data from the form (replace this with your actual form data)
const CreateData = {
  firstName: 'John',
  lastName: 'Doe',
  sex: 'Male',
  age: '30',
  bloodGroup: 'A+',
  mobile: '+1234567890',
  email: 'john.doe@example.com',
  address: '123 Main St',
  city: 'New York',
  state: 'NY',
  remarks: 'Some remarks about the patient',
  image: 'https://example.com/image.jpg',
};

// Convert the user data to a JSON string
const jsonData = JSON.stringify(userData, null, 2);

// Write the JSON data to data.json
fs.writeFile('data.json', jsonData, (err) => {
  if (err) {
    console.error('Error writing data.json:', err);
  } else {
    console.log('data.json created successfully.');
  }
});
