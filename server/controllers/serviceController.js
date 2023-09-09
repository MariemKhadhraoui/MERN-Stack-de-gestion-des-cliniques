const Service = require("../models/service");

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

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

// Creer un service 
exports.createService = async (req, res) => {
  try {
    const { nom, id_deppartement } = req.body;
    const existingService = await Service.findOne({ nom });
    if (existingService) {
      return res.status(400).json({
        error: "Un service avec ce nom existe déjà. Le nom doit être unique.",
      });
    }
    const result = await cloudinary.uploader.upload(req.file.path);

    const service = new Service({ 
      nom,
      image:  result.secure_url, 
      id_deppartement });
    await service.save();
    res
      .status(201)
      .json({ message: "service enregistrée avec succès", service });
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de l'enregistrement de la service",
    });
  }
};

// Modification d'une service
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, id_deppartement } = req.body;
    const service = await Service.findById(id)

    if (!service) {
      return res.status(404).json({ error: 'service non trouvée' });
    }
      // Vérifiez si une nouvelle image a été téléchargée
      let imageUrl;
      if (req.file) {
        // Téléchargez la nouvelle image sur Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        // Récupérez l'URL sécurisée de la nouvelle image
        imageUrl = result.secure_url;
        // Mettez à jour l'URL de l'image dans la base de données
        service.image = imageUrl;
      }
      service.nom = nom ;
      service.id_deppartement =id_deppartement;
      await service.save();
     res.json({ message: "service modifiée avec succès", service });
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la modification de la service",
    });
  }
};

// Affichage d'une service
exports.getService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ error: "service non trouvée" });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la récupération de la service",
    });
  }
};

// Affichage de la liste des service
exports.getAllService = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la récupération des services",
    });
  }
};

// Suppression d'une service
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).json({ error: "service non trouvée" });
    }
    res.json({ message: "service supprimée avec succès" });
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la suppression de la service",
    });
  }
};

// Recherche d'une service par nom
exports.searchService = async (req, res) => {
  try {
    const { nom } = req.query;
    const regex = new RegExp(nom, "i");
    const services = await Service.find({ nom: regex });

    if (services.length === 0) {
      return res.status(404).json({ error: "Aucune service trouvée" });
    }

    res.json(services);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la recherche des service",
    });
  }
};
