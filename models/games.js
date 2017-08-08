const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/gamesdb');


const GamesSchema = new Schema({
  title: {type: String, required: true, unique: true},
  genre: { type: String, lowercase: true},
  publisher: {type: String, lowercase: true, unique: true},
  developer: {type: String, lowercase: true, unique: true},
  system: {type: String, lowercase: true, unique: true}
})

const Game = mongoose.model("Game", GamesSchema , "games")
module.exports = Game;
