const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const cliniqueController = require('../controllers/cliniqueController'); 





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


// Enregistrement d'une clinique
router.post('/add', upload.single('image'), cliniqueController.createClinique);

 // Modification d'une clinique
router.put('/put/:id', upload.single('image'), cliniqueController.updateClinique);

// Affichage d'une clinique
router.get('/get/:id', cliniqueController.getClinique);

// Affichage de la liste des cliniques
router.get('/get', cliniqueController.getAllCliniques);

// Suppression d'une clinique
router.delete('/delete/:id', cliniqueController.deleteClinique);

// Recherche d'une clinique par nom
router.get('/search', cliniqueController.searchClinique);
// recherche multicritère de clinique
router.get('/searchCliniques', cliniqueController.searchCliniques);

module.exports = router;
