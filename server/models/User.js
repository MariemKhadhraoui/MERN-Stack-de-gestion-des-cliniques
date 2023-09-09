const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
 
  role: { type: String, enum: ['directeur', 'manager', 'admin', 'membre' ], default: 'membre' },

});

const User = mongoose.model('User', userSchema);

module.exports = User;
