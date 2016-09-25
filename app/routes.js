module.exports = function(app, passport, dbQueries) {

  app.get('/api', function (req, res, next) {
    
  });



  app.get('/404', function(req, res) {
        res.send("error");
  });

  // process the login form
  app.post('/api/login', passport.authenticate('local-login', {
            successRedirect : '/api/auth', // In both cases redirect to auth
            failureRedirect : '/api/auth', // 
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
        //res.redirect('/profile');
    });


  app.post('/api/signup', passport.authenticate('local-signup', {
    successRedirect : '/api/auth', // redirect to the secure profile section
    failureRedirect : '/api/auth', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  app.get('/api/auth', function (req, res, next) {

    var status = {
      status: req.isAuthenticated(),
      user: req.user || undefined
    };


    if(!req.isAuthenticated()) {
      res.json(401, status);
    } else {
      res.json(status);  
    }
  });

  app.post('/api/check/username', function (req,res,next) {
    dbQueries.getUserFromUsername(req.body.username, function (user) {

      if(user)
        res.json(user);
      else
        res.json(401, user);
    });
  });

  app.post('/api/get/user/games', function (req,res,next) {
    dbQueries.getSettings(function (settings) {
      
      dbQueries.getUserFromSlug(req.body.nickSlug, function (user) {
        dbQueries.getCollectionsFromUserId(user.id, function (collections) {
          dbQueries.getGamesForUserFromUserId(user.id, function (newGames) {
            res.json({
              games: newGames,
              newGames: newGames,
              user: user,
              settings: settings,
              collections: collections
            });
          });  
        });
      });
    });
  });

  app.post('/api/check/nick', function (req,res,next) {
    console.log('checking nick', req.body.nick);
    dbQueries.getUserFromNick(req.body.nick, function (user) {
      if(user)
        res.json(user);
      else
        res.json(401, user);
    });
  });

  app.get('/api/logout', function (req, res, next) {

    req.logout();
    res.json({
      status: 'logged out'
    });
  });


  app.post('/api/add/game', function (req,res,next) {
    
    console.log('returning game', req.body);

    dbQueries.addGame(req.body, function (game) {

      res.json(game);
    });
  });

  app.post('/api/update/game', function (req,res,next) {

    dbQueries.updateGame(req.body.gameId, req.body.newValue, req.body.field, function (game) {
      res.json(game);
    });
  });


  app.post('/api/remove/game', function (req,res,next) {

    dbQueries.removeGame(req.body.gameId, function () {
      res.json({});
    });
  });


  // route middleware to make sure
  function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
  }

  function isLoggedInBoolean(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return true;
    return false;
  }

  function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


}