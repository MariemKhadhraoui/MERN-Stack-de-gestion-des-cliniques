const Dept = require("../models/deppartement");

// Cree
exports.createDept = async (req, res) => {
  try {
    const { nom, services, id_manager } = req.body;
    const existingDept = await Dept.findOne({ nom });
    if (existingDept) {
      return res
        .status(400)
        .json({
          error:
            "Un departement avec ce nom existe déjà. Le nom doit être unique.",
        });
    }
    const dept = new Dept({ nom, services, id_manager });
    await dept.save();
    res
      .status(201)
      .json({ message: "departement enregistrée avec succès", dept });
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          "Une erreur est survenue lors de l'enregistrement de la departement",
      });
  }
};

// Modification d'une dept
exports.updateDept = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, services, id_manager } = req.body;
    const dept = await Dept.findByIdAndUpdate(
      id,
      { nom, services, id_manager },
      { new: true }
    );
    if (!dept) {
      return res.status(404).json({ error: "departement non trouvée" });
    }
    res.json({ message: "departement modifiée avec succès", dept });
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          "Une erreur est survenue lors de la modification de la departement",
      });
  }
};

// Affichage d'une departement
exports.getDept = async (req, res) => {
  try {
    const { id } = req.params;
    const dept = await Dept.findById(id);
    if (!dept) {
      return res.status(404).json({ error: "departement non trouvée" });
    }
    res.json(dept);
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          "Une erreur est survenue lors de la récupération de la departemenent",
      });
  }
};

// Affichage de la liste des dept
exports.getAllDept = async (req, res) => {
  try {
    const depts = await Dept.find();
    res.json(depts);
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          "Une erreur est survenue lors de la récupération des departement",
      });
  }
};

// Suppression d'une dept
exports.deleteDept = async (req, res) => {
  try {
    const { id } = req.params;
    const dept = await Dept.findByIdAndDelete(id);
    if (!dept) {
      return res.status(404).json({ error: "departement non trouvée" });
    }
    res.json({ message: "departement supprimée avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          "Une erreur est survenue lors de la suppression de la departement",
      });
  }
};

// Recherche d'une dept par nom
exports.searchDept = async (req, res) => {
  try {
    const { nom } = req.query;
    const regex = new RegExp(nom, "i");
    const depts = await Dept.find({ nom: regex });

    if (depts.length === 0) {
      return res.status(404).json({ error: "Aucune departement trouvée" });
    }

    res.json(depts);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Une erreur est survenue lors de la recherche des departement",
      });
  }
};
