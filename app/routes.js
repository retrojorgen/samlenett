module.exports = function(app, passport, dbQueries, frontpageTemplate, consoleTemplate, gameTemplate) {

  app.get('/', function (req, res, next) {
    console.log(req.isAuthenticated());
    console.log(req.user);
    try {
      var html = frontpageTemplate(
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


  app.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/', // redirect to the secure profile section
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
        res.redirect('/');
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


  // route middleware to make sure
  function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
  }


}