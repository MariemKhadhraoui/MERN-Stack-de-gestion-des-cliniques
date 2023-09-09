const mongoose = require('mongoose');

const cliniqueSchema = new mongoose.Schema({
  nom: { 
       type: String,
    },
  adresse: { 
    type: String,
    
     },
     email: { 
      type: String,
      
       },
  image: {
  
         type: String,
    },
     
     pays: {
      type: String,
    },
  ville: {
      type: String,
    },
    
  code_postale: { 
    type: Number, 
       },
       
  numtelephone: {
      type: Number,
    },
  id_directeur: { 
    type: String, 
     
  },
  description:{ 
    type: String, 
     
  },
  
   latitude: { type: Number },
   longitude: { type: Number },
  
  dateOuverture :{
      type :Date,
  },
  
  horairesOuvertureL : {
     type :String ,
  }
         
});


const Clinique = mongoose.model('Clinique', cliniqueSchema);

module.exports = Clinique;
