module.exports = function(app, passport, dbQueries, importers) {
  

  app.get('/api', function (req, res, next) {
    console.log(req.isAuthenticated());
    console.log(req.user);

    try {
      var html = frontpageTemplate(
      { 
        isAuthenticated: req.isAuthenticated(),
        user: req.user,
        title: 'Home' , 
        hest: 'blabla', 
        consoles: consoles
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
      res.redirect('/');
    });
    
  });

  app.get('/404', function(req, res) {
        res.send("error");
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

  app.get('/api/logout', function (req, res, next) {

    req.logout();
    res.json({
      status: 'logged out'
    });
  });


  app.post('api/import/games/:consoleId', function (req, res, next) {
    var consoleId = req.params.consoleId;
  });


  app.post('/api/generate/unreleased/:consoleId/:regionId', function (req, res, next) {
    var allowedGames = req.body.games;
    var consoleId = req.params.consoleId;
    var regionId = req.params.regionId;
    //games = games.split("\n");
    res.json("pushing");
    //console.log(games);
    dbQueries.getParentGamesFromConsoleId(consoleId, function (games) {
      games.forEach(function (game) {
        if(allowedGames.indexOf(game.title) < 0) {
          //console.log(game.title + ' has no US release and will be removed');
          dbQueries.setVariantAsUnreleased(game.id, regionId, function (response) {
            //console.log(response);
          });
        }
      });
    });
  });


  app.get('/api/generate/children/:consoleId', function (req,res,next) {
    res.send('generating');
    var consoleId = req.params.consoleId;
    dbQueries.getRegionsFromConsoleId(consoleId, function (regions) {
      dbQueries.getParentGamesFromConsoleId(consoleId, function (games) {
        console.log('found ' + games.length + 'games with ' + regions.length + ' regions. total: ' + (games.length + regions.length) + 'games with chilren');
        console.log('generating children');
        games.forEach(function (game) {
          regions.forEach(function (region) {
            dbQueries.isGameVariant(game.id, region.id, function (response) {
              //console.log('found game?', response);
              
              if(!response) {
                  //console.log('added variant ' + game.title + ' - ' + region.name);
                  dbQueries.addGameVariant(region.id, '', consoleId, game.id, function () {
                  });
              }
              else {
                //console.log('dropped variant ' + game.title + ' - ' + region.name);
              }
                
            });
          });
        });
      });
    });
  });


  app.post('api/user/add/game', function (req, res, next) {
    if(req.body.regionId, req.body.gameTitle, req.body.consoleId, req.body.parentId, req.body.gameRegion) {
      dbQueries.isGameVariant(req.body.gameTitle, req.body.gameRegion, function (result) {
        if(result) {
          console.log('spillet var der ', result);
        } else {
          dbQueries.addGameVariant(req.body.regionId, req.body.gameTitle, req.body.consoleId, req.body.parentId, function (result) {
            if(result) {
              console.log('ble lagt til ', result);
            } else {
              console.log('noe feilet');
            }
          })
        }
      })
    } else {
      res.json(401, {
        status: "missing parameters"
      });
    }
  });

  // requires consoleslug
  app.post('/api/conditions', function (req, res, next) {
    dbQueries.getConsoleIdFromSlug(req.body.consoleSlug, function (result) {
      if(result) {
        dbQueries.getConditionsFromConsoleId(result.id, function (results) {
          if(results) {
            res.json(results);
          } else {
            res.json(404, {
              status: "no conditions"
            })
          }
        });
      } else {
        res.json(404, {
          status: "no console"
        });
      }
    });
  });

  app.post('/api/check/nick', function (req, res, next) {
    dbQueries.getNickSlugfromNick(req.body.nick, function () {
      res.json(401, {
        validation: true,
        code: "notavailable"
      });
    }, function () {
      res.json({
        validation: false,
        code: "available"
      });
    });
  });

  app.post('/api/check/email', function (req, res, next) {
    console.log('validerer ',validateEmail(req.body.email));
    if(!validateEmail(req.body.email)) {

      res.json(404, {
        validation: true,
        code: "novalid"
      });
    } else {
      dbQueries.getUsernameFromUsername(req.body.email, function () {
        res.json(404, {
          validation: true,
          code: "alreadyexists"

        });
      }, function () {
        res.json({
          validation: false,
          code: "available"
        });
      });
    }
  });


  app.post('/api/games', function (req, res, next) {
    dbQueries.getGamesFromConsoleSlug(req.body.consoleSlug, function (games) {

        res.json(games);

    }, function () {
        res.json(404, {
            code: "nogames"
        });
    });
  });




  app.post('/games/:consoleSlug/:gameSlug', function (req, res, next) {
    
    dbQueries.getGameFromSlug(req.body.consoleSlug, req.body.gameSlug, function (games) {
      console.log(games);
      res.json({
        game: games
      });

    }, function () {
      res.json(404, {
        code: "nogame"
      })
    });
  });



  app.get('/tools/getgamefromgameid/:gameId', function (req, res,next) {
    dbQueries.getGameRegionsFromGameId(req.params.gameId, function (games) {
      res.json(games);
    });
  });


  app.get('/tools/import/games/nes/games', function (req, res, next) {
    importers.nesImportGames();
    res.send('ok');
  });

  app.get('/tools/import/games/nes/variants', function (req, res, next) {
    importers.nesImportVariants();
    res.send('ok');
  });

  app.get('/tools/import/games/nes/publishers', function (req, res, next) {
    importers.nesImportPublishers();
    res.send('ok');
  });


  app.get('/auth', function (req, res, next) {

    var status = {
      status: req.isAuthenticated()
    };

    res.json(status);
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