const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

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



router.post('/add', upload.single('image'), serviceController.createService);


router.put('/put/:id', upload.single('image'), serviceController.updateService);


router.get('/get/:id', serviceController.getService);


router.get('/get', serviceController.getAllService);


router.delete('/delete/:id', serviceController.deleteService);


router.get('/search', serviceController.searchService);

module.exports = router;
