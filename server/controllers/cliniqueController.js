
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Clinique = require('../models/clinique');
//const cloudinary = require('../utils/cloudinary');

//------------------------ Cloudinary Infos -----------------------------------------------//
//Configuration de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Configuration de multer pour spécifier où enregistrer les fichiers en utilisant CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'cliniqueImages', //  dossier dans lequel les images seront stockées sur Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'] //  formats de fichier autorisés
  }
});

const upload = multer({ storage: storage });


//--------------------------  ajout d'une clinique   --------------------------------------------//
// exports.createClinique = async (req, res) => {
//   try { 
//     const { nom, adresse, code_postale,pays,email, ville, numtelephone, description, id_directeur, latitude, longitude } = req.body;
//      console.log("test1")
//     // Tester si une clinique existe déjà avec le même nom
//     const existingClinique = await Clinique.findOne({ nom });
//     if (existingClinique) {
//       return res.status(400).json({ error: 'Une clinique avec ce nom existe déjà. Le nom doit être unique.' });
//     }
//       console.log("test2")
//        // Télécharger l'image sur Cloudinary
//        console.log(req)
//        const result = await cloudinary.uploader.upload(req.file.path);
//        console.log(req)
//        console.log(result)


//     // Création de la clinique avec l'image sécurisée depuis Cloudinary
//     const clinique = new Clinique({
//       nom,
//       adresse,
//       image: result.secure_url, // Stockez l'URL sécurisée de l'image de Cloudinary dans le champ 'image' du livre,
//       code_postale,
//       pays,
//       ville, 
//       numtelephone, 
//       email,
//       description,
//       id_directeur,
//       localisation: {
//         latitude: parseFloat(latitude),
//         longitude: parseFloat(longitude),
//       },
//     });

//     // Sauvegarde de la clinique en base de données
//     await clinique.save();
    
   
//     res.status(201).json({ message: 'Clinique enregistrée avec succès', clinique });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement de la clinique' });
//   }
// };


exports.createClinique =  async (req, res) => {
  try { 
    console.log("test111111")
    const { nom, adresse, code_postale, pays, email, ville, numtelephone, description,image, id_directeur, latitude, longitude, dateOuverture, horairesOuvertureL } = req.body;
    console.log("test1")
    // Tester si une clinique existe déjà avec le même nom
    const existingClinique = await Clinique.findOne({ nom });
    if (existingClinique) {
      return res.status(400).json({ error: 'Une clinique avec ce nom existe déjà. Le nom doit être unique.' });
    }
     // Télécharger l'image sur Cloudinary
     const result = await cloudinary.uploader.upload(req.file.path);
     console.log("test2")
     console.log(result)
    // Création de la clinique avec l'image sécurisée depuis Cloudinary
    const clinique = await Clinique.create({
      nom,
      adresse,
      image:  result.secure_url, 
      code_postale,
      pays,
      ville, 
      numtelephone, 
      email,
      description,
      id_directeur,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      dateOuverture,
      horairesOuvertureL,
    });

  res.status(201).json({ message: 'Clinique enregistrée avec succès', clinique });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement de la clinique' });
  }
};



// Ajouter une clinique
// exports.createClinique = async (req, res) => {
//   try {
//     const { nom, adresse, code_postale, id_directeur } = req.body;
//     const existingClinique = await Clinique.findOne({ nom });
//     if (existingClinique) {
//       return res.status(400).json({ error: 'Une clinique avec ce nom existe déjà. Le nom doit être unique.' });
//     }
//     const clinique = new Clinique({ nom, adresse, code_postale, id_directeur });
//     await clinique.save();
//     res.status(201).json({ message: 'Clinique enregistrée avec succès', clinique });
//   } catch (error) {
//     res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement de la clinique' });
//   }
// };


//--------------------------  Mise a jour d'une clinique   --------------------------------------------//
exports.updateClinique = async (req, res) => {
  try {
    const { id } = req.params;
  
    const { nom, adresse, code_postale,pays,email, ville, numtelephone, description, id_directeur, dateOuverture,
      horairesOuvertureL,latitude, longitude } = req.body;

    // Vérifier si la clinique existe avant de la mettre à jour
    const clinique = await Clinique.findById(id);
    if (!clinique) {
      return res.status(404).json({ error: 'Clinique non trouvée' });
    }

    // Vérifiez si une nouvelle image a été téléchargée
    let imageUrl;
    if (req.file) {
      // Téléchargez la nouvelle image sur Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      // Récupérez l'URL sécurisée de la nouvelle image
      imageUrl = result.secure_url;
      // Mettez à jour l'URL de l'image dans la base de données
      clinique.image = imageUrl;
    }
   // Mettez à jour les autres champs de la clinique 
      clinique.nom = nom;
      clinique.adresse = adresse;
      clinique.pays = pays;
      clinique.ville = ville;
      clinique.email = email;
      clinique.numtelephone = numtelephone;
      clinique.description = description;
      clinique.code_postale = code_postale;
      clinique.id_directeur = id_directeur;
      clinique.latitude = parseFloat(latitude);
      clinique.longitude = parseFloat(longitude);
      clinique.dateOuverture = dateOuverture;
      clinique.horairesOuvertureL= horairesOuvertureL; 
    
    // Sauvegarde de la clinique mise à jour en base de données
    await clinique.save();

    res.json({ message: 'Clinique modifiée avec succès', clinique });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la modification de la clinique' });
  }
};



//--------------------------  Affichage d'une clinique par id   --------------------------------------------//

exports.getClinique = async (req, res) => {
  try {
    const { id } = req.params;
    const clinique = await Clinique.findById(id);
    if (!clinique) {
      return res.status(404).json({ error: 'Clinique non trouvée' });
    }
    res.json(clinique);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de la clinique' });
  }
};


//--------------------------  Affichage de la liste des cliniques  --------------------------------------------//

exports.getAllCliniques = async (req, res) => {
  try {
    const cliniques = await Clinique.find();
    res.json(cliniques);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des cliniques' });
  }
};

// 

//--------------------------  Suppression d'une clinique  --------------------------------------------//

exports.deleteClinique = async (req, res) => {
  try {
    const { id } = req.params;
    const clinique = await Clinique.findByIdAndDelete(id);
    if (!clinique) {
      return res.status(404).json({ error: 'Clinique non trouvée' });
    }
    res.json({ message: 'Clinique supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de la clinique' });
  }
};

//-------------------------- Recherche d'une clinique par nom   --------------------------------------------//
exports.searchClinique = async (req, res) => {
  try {
    const { nom } = req.query;
    const regex = new RegExp(nom, 'i');
    const cliniques = await Clinique.find({ nom: regex });
    res.json(cliniques);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la recherche des cliniques' });
  }
};



//---------------------------------------- Recherche Multi-Critère ------------------------------------------//
exports.searchCliniques = async (req, res) => {
  try {
    const { nom, code_postale, pays,email, ville, numtelephone,id_directeur, latitude, longitude, dateOuverture,
      horairesOuvertureL } = req.query;
       const filters = {};

    //  critères de recherche de clinique fournis par l'utilisateur
    if (nom) {
      filters.nom = { $regex: new RegExp(nom, 'i') }; // Recherche insensible à la casse
    }
    if (code_postale) {
      filters.code_postale = code_postale;
    }
    if (pays) {
      filters.pays = pays;
    
  }; 
  if (dateOuverture) {
    filters.dateOuverture = dateOuverture;
  }; 

  if (horairesOuvertureL) {
  filters.horairesOuvertureL = horairesOuvertureL;
  }
  if (email) {
      filters.email = email;
    }
  if (ville) {
      filters.ville = ville;
    }
  if (numtelephone) {
      filters.numtelephone = numtelephone;
    }
    if (id_directeur) {
      filters.id_directeur = id_directeur;
    }
    if (latitude) {
      filters.latitude = parseFloat(latitude);
    }
    if (longitude) {
      filters.longitude = parseFloat(longitude);
    }
  
    // Requête de recherche avec les filtres
    const cliniques = await Clinique.find(filters);

    res.status(200).json({ cliniques });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la recherche des cliniques' });
  }
};
