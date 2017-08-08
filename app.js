const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const Games = require('./models/games');


const app = express();

const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

// const gamesSchema = require('./model/games.js');
// //create app instance
//
const url = 'mongodb://localhost:27017/gamesdb';

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator());

// connect mongo DB through mongoose ('gamesdb is database name')

// const Games = mongoose.model('Games', gamesSchema);
// var game = new Games({title: "Metal Gear Solid V"});
// game.genre.push('action' );
//
// game.save().then(function () {
//   //after successful save
//   console.log('Game is saved');
// }).catch(function () {
//   console.log('Mongo could not save game');
// });

let findAll = function(db, callback) {
  let collection = db.collection('games');
  collection.find().toArray(function(err, result) {
    console.log("found", result.length, "games");
    callback(result);
  });
}

app.get('/', function(request, response) {
  Games.find({}, function(docs) {
    console.log(docs);
    response.render('games', {games: docs});

  });
});

app.get('/games/:gamesNumber', function(request, response) {
  const gamesNumber = parseInt(request.params.gamesNumber);
  Games.find({
    Games: gameNumber
  }, function(docs) {
    response.render('games', {
      gameNumber: gameNumber,
      games: docs
    });
  })
});

app.get('/newGame', function(request, response) {
  response.render('newGameForm');
});

app.post('/newGameForm', function(request, response) {
  let newGame = {
    title: request.body.title,
    genre: request.body.genre,
    publisher: request.body.publisher,
    developer: request.body.developer,
    system: request.body.system,
  }
  Game.create(newGame).then(function() {
    response.redirect('/');
  }).catch(function() {
    response.render('newGameForm', {
      error: true,
      Games: newGame
    })
  })
});

app.listen(3000, function() {
  console.log('I have the waters of Lake Minnetonka I\'m Alive!!!')
});
