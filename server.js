var express = require('express')
  , logger = require('morgan')
  , database = require('./database.js')
  , app = express()
  , template = require('jade').compileFile(__dirname + '/source/templates/homepage.jade')
  , consoleTemplate = require('jade').compileFile(__dirname + '/source/templates/console.jade')
  , gameTemplate = require('jade').compileFile(__dirname + '/source/templates/game.jade');


app.use(logger('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res, next) {
  try {
    var html = template(
    { 
      title: 'Home' , 
      hest: 'blabla', 
      games: [
        {'game': 'nes game 1'},
        {'game': 'nes game 2'},
        {'game': 'nes game 3'},
        {'game': 'nes game 4'}
      ]
    })
    res.send(html)
  } catch (e) {
    next(e)
  }
});


app.get('/:consoleSlug', function (req, res, next) {
  console.log(req.params.consoleSlug);
  database.getGamesFromConsoleSlug(req.params.consoleSlug, function (games) {

    console.log(games);
    try {
      var html = consoleTemplate(games);
      res.send(html);
    } catch (e) {
      next(e);
    }


  }, function () {
    res.send("error");
  });
});


app.get('/:consoleSlug/:gameSlug', function (req, res, next) {
  
  database.getGameFromSlug(req.params.consoleSlug, req.params.gameSlug, function (games) {
    
    try {
      var html = gameTemplate(games);
      res.send(html);
    } catch (e) {
      next(e);
    }

  }, function () {

  });
}, function () {
  
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
});
