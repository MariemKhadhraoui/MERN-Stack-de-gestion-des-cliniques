const RendezVous = require("../models/rendezVous");

// Cree
exports.createRendezVous = async (req, res) => {
  try {
    const { date, id_patient, id_service, description,staut } = req.body;

    const formattedDate = new Date(date).toISOString().split("T")[0];

    const rendezVous = new RendezVous({
      date: formattedDate,
      id_patient,
      id_service,
      description,
      statut:"attente"
    });
    await rendezVous.save();
    res
      .status(201)
      .json({ message: "Rendez vous enregistrée avec succès", rendezVous });
  } catch (error) {
    res.status(500).json({
      error:
        "Une erreur est survenue lors de l'enregistrement de la rendez vous",
    });
  }
};

// update
exports.updateRendezVous = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, id_patient, id_service, description } = req.body;
    const formattedDate = new Date(date).toISOString().split("T")[0];
    const rendezVous = await RendezVous.findByIdAndUpdate(
      id,
      { date: formattedDate, id_patient, id_service, description },
      { new: true }
    );
    if (!rendezVous) {
      return res.status(404).json({ error: "rendez vous non trouvée" });
    }
    res.json({ message: "rendez vous modifiée avec succès", rendezVous });
  } catch (error) {
    res.status(500).json({
      error:
        "Une erreur est survenue lors de la modification de la rendez vous",
    });
  }
};

// Affichage
exports.getRendezVous = async (req, res) => {
  try {
    const { id } = req.params;
    const rendezVous = await RendezVous.findById(id);
    if (!rendezVous) {
      return res.status(404).json({ error: "render vous non trouvée" });
    }
    res.json(rendezVous);
  } catch (error) {
    res.status(500).json({
      error:
        "Une erreur est survenue lors de la récupération de la rendez vous",
    });
  }
};

// Affichage de la liste des RendezVous
exports.getAllRendezVous = async (req, res) => {
  try {
    const rendezVous = await RendezVous.find();
    res.json(rendezVous);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la récupération des rendez Vous",
    });
  }
};

// Suppression d'une rendez Vous
exports.deleteRendezVous = async (req, res) => {
  try {
    const { id } = req.params;
    const rendezVous = await RendezVous.findByIdAndDelete(id);
    if (!rendezVous) {
      return res.status(404).json({ error: "rendez Vous non trouvée" });
    }
    res.json({ message: "rendez Vous supprimée avec succès" });
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la suppression de la rendez Vous",
    });
  }
};

// Recherche d'une rendez Vous par date
exports.searchRendezVous = async (req, res) => {
  try {
    const { nom } = req.query;
    const regex = new RegExp(nom, "i");
    const rendezVous = await RendezVous.find({ nom: regex });

    if (rendezVous.length === 0) {
      return res.status(404).json({ error: "Aucune rendez Vous trouvée" });
    }

    res.json(rendezVous);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la recherche des rendez Vous",
    });
  }
};

// Accepter rendez vous
exports.accepterRendezVous = async (req, res) => {
  try {
    const { id } = req.params;
    const rendezVous = await RendezVous.findById(id);

    if (!rendezVous) {
      return res.status(404).json({ error: "Rendez-vous non trouvé" });
    }

    rendezVous.statut = "accepté";
    await rendezVous.save();

    res.json({ message: "Rendez-vous accepté avec succès", rendezVous });
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de l'acceptation du rendez-vous",
    });
  }
};
// Refuser rendez vous
exports.refuserRendezVous = async (req, res) => {
  try {
    const { id } = req.params;
    const rendezVous = await RendezVous.findById(id);

    if (!rendezVous) {
      return res.status(404).json({ error: "Rendez-vous non trouvé" });
    }

    rendezVous.statut = "refusé";
    await rendezVous.save();

    res.json({ message: "Rendez-vous refusé avec succès", rendezVous });
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la refus du rendez-vous",
    });
  }
};
