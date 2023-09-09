const mongoose = require("mongoose");

const deppartementSchema = new mongoose.Schema({
  nom: {
    type: String,
  },
  services: {
    type: Array,
    default: [],
  },
  id_manager: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  
});

const Deppartement = mongoose.model("Deppartement", deppartementSchema);

module.exports = Deppartement;
