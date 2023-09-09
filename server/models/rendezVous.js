const mongoose = require("mongoose");

const rendezVousSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  id_patient: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User' 
  },
  id_service: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Service' 
  },
  description: {
    type: String,
  },
  statut: {
    type: String,
    enum: ["attente", "accepté", "refusé"], // Les valeurs possibles pour le statut 
  },
});

const RendezVous = mongoose.model("RendezVous", rendezVousSchema);

module.exports = RendezVous;
