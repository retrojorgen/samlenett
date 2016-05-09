var frontpageTemplate = require('jade').compileFile(__dirname + '/../source/templates/homepage.jade')
, consoleTemplate   = require('jade').compileFile(__dirname + '/../source/templates/console.jade')
, gameTemplate      = require('jade').compileFile(__dirname + '/../source/templates/game.jade')
, userTemplate      = require('jade').compileFile(__dirname + '/../source/templates/user.jade')
, errorTemplate      = require('jade').compileFile(__dirname + '/../source/templates/error.jade');


module.exports = function(app, passport, dbQueries) {

  app.get('/', function (req, res, next) {
    console.log(req.isAuthenticated());
    console.log(req.user);
    try {
      var html = frontpageTemplate(
      { 
        isAuthenticated: req.isAuthenticated(),
        user: req.user,
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


  app.get('/profile', function(req, res) {
    console.log(req.user);
    if(req.user) res.redirect('/user/' + req.slug);
    else res.redirect('/');
    // render the page and pass in any flash data if it exists
  });

  app.get('/login', function(req, res) {
    console.log('error');
    res.redirect('/');
    // render the page and pass in any flash data if it exists
  });

  app.get('/user/:usernameSlug', function(req, res) {

    dbQueries.getUserFromSlug(req.params.usernameSlug, function (user) {

      try {
        var html = userTemplate({
          user: user
        });
        res.send(html);
      } catch (e) {
        next(e);
      }


    }, function () {
      res.redirect('/404');
    });
    
  });

  app.get('/404', function(req, res) {
      try {
        var html = errorTemplate();
        res.send(html);
      } catch (e) {
        next(e);
      }
    
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
    }),
        function(req, res) {
            console.log("hello");
            /**
            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
            **/
        res.redirect('/profile');
    });


  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));



  app.get('/games/:consoleSlug', function (req, res, next) {
    console.log(req.params.consoleSlug);
    dbQueries.getGamesFromConsoleSlug(req.params.consoleSlug, function (games) {

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


  app.get('/games/:consoleSlug/:gameSlug', function (req, res, next) {
    
    dbQueries.getGameFromSlug(req.params.consoleSlug, req.params.gameSlug, function (games) {
      console.log(games);
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

  app.get('/tools/validatenick/:nick', function (req, res, next) {
    dbQueries.getNickSlugfromNick(decodeURIComponent(req.params.nick), function () {
      res.json({
        validation: true,
        message: decodeURIComponent(req.params.nick) + " er opptatt"
      });
    }, function () {
      res.json({
        validation: false,
        message: decodeURIComponent(req.params.nick) + " er ledig"
      });
    });
  });

  app.get('/tools/validateusername/:username', function (req, res, next) {
    console.log('validerer ',validateEmail(decodeURIComponent(req.params.username)));
    if(!validateEmail(decodeURIComponent(req.params.username))) {

      res.json({
        validation: true,
        message: decodeURIComponent(req.params.username) + " er ikke en gyldig e-postadresse"
      });
    } else {
      dbQueries.getUsernameFromUsername(decodeURIComponent(req.params.username), function () {
        res.json({
          validation: true,
          message: "Det finnes allerede en bruker registrert på " + decodeURIComponent(req.params.username) + ". Prøv heller å logge inn hvis du eier denne kontoen"

        });
      }, function () {
        res.json({
          validation: false,
          message: decodeURIComponent(req.params.username) + " er ledig"
        });
      });
    }
  });


  // route middleware to make sure
  function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
  }

  function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


}