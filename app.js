const express = require('express');
const mustacheExpress = require('mustache-express');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const gamesSchema = require('./model/games.js');
//create app instance
const app = express();
const url = 'mongodb://localhost:27017/games';

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

//connect mongo DB through mongoose ('recipesdb is database name')
mongoose.connect('mongodb://localhost:27017/games');

const Games = mongoose.model('Games', gamesSchema);
var game = new Games({title: "Metal Gear Solid V"});
game.genre.push('action' );

game.save().then(function () {
  //after successful save
  console.log('Game is saved');
}).catch(function () {
  console.log('Mongo could not save game');
});

let findAll = function(db, callback) {
  let collection = db.collection('games');
  collection.find().toArray(function(err, result) {
    console.log("found", result.length, "games");
    callback(result);
  });
}

app.get('/', function(request, response) {
  MongoClient.connect(url, function(err, db) {
    findAll(db, function(result) {
      response.render('games', {
        videoGames:result
      });
    });
  });
});
app.listen(3000, function() {
  console.log('I have the waters of Lake Minnetonka I\'m Alive!!!')
});
