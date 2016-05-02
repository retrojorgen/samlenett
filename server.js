var express = require('express')
  , logger = require('morgan')
  , database = require('./database.js')
  , app = express()
  , template = require('jade').compileFile(__dirname + '/source/templates/homepage.jade')
  , consoleTemplate = require('jade').compileFile(__dirname + '/source/templates/console.jade')


app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

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
})

app.get('/:console', function (req, res, next) {
  console.log(req.params.console);
  database.getGamesFromConsole(req.params.console, function (games) {

    try {
      var html = consoleTemplate(
      { 
        title: 'Home' , 
        hest: 'blabla', 
        games: games
      })
      res.send(html)
    } catch (e) {
      next(e)
    }


  }, function () {
    res.send("error");
  });
})



app.get('/:console/:game', function (req, res, next) {
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
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})