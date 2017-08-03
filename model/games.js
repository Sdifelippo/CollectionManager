const mongoose = require('mongoose');

const videoGame = new mongoose.Schema({
  title: {type: String, required: true, unique: true},
  genre: [{ type: String, lowercase: true}],
  publisher: {type: String, lowercase: true, unique: true},
  developer: {type: String, lowercase: true, unique: true},
  system: {type: String, lowercase: true, unique: true}
})

module.exports = videoGame;
