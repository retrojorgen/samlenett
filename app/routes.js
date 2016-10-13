var lwip = require('lwip');
var fs = require('fs');

module.exports = function(app, passport, dbQueries) {

  app.get('/api', function (req, res, next) {
    
  });


  app.get('/404', function(req, res) {
        res.send("error");
  });

  // process the login form
  app.post('/api/login', passport.authenticate('local-login', {
            successRedirect : '/api/auth/success', // In both cases redirect to auth
            failureRedirect : '/api/auth/fail', // 
            failureFlash : true // allow flash messages
    }));


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
      res.status(401).json(status);
    } else {
      res.json(status);  
    }
  });

  app.get('/api/auth/:status', function (req, res, next) {

    var status = {
      status: req.isAuthenticated(),
      user: req.user || undefined
    };

    
    if(!req.isAuthenticated()) {
      res.status(401).json(status);
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

  app.post('/api/get/user/collection', function (req,res,next) {
    
    dbQueries.getCollectionFromId(req.body.collectionId, function (collection) {
      res.json(collection);
    });
  });

  app.post('/api/check/nick', function (req,res,next) {
    
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

  app.get('/api/me/collections', function (req, res, next) {
    dbQueries.getCollectionsFromUserId(req.user._id, function (collections) {
      
      res.json(collections);
    });
  });

  app.post('/api/me/update/collection', function (req, res) {
    console.log(req.body.collection);
    
    dbQueries.updateCollection(req.body.collection, function (collection) {
      res.json(collection);
    });
  });

  app.post('/api/me/create/collection', function (req, res) {
    var title = "ny liste";
    if(req.body.type == "collections") title = "Ny samling";
    if(req.body.type == "goals") title = "Nye mål";
    if(req.body.type == "sales") title = "Ny salgsliste";
    dbQueries.addCollection(title, req.user._id, req.body.type, function (collection) {
      res.json(collection);
    });
  });


  app.post('/api/add/game', function (req,res,next) {
    
    

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

  app.post('/api/me/upload/image', function (req, res, next) {

    dbQueries.addImage(function (addedImage) {

      var base64Data = req.body.image.replace(/^data:image\/jpeg;base64,/,'');
      var img = new Buffer(base64Data, 'base64');

      lwip.open(img, 'jpg', function (err, image) {
        var width = image.width();
        var height = image.height();
        if(width > 1400) {
          height = (image.height() / image.width()) * 1400;
          width = 1400;
        }

        if(!err) {
            image.resize(width, height, function (err, image) {
              if(!err)
                image.toBuffer('jpg', {quality: 80}, function(err, buffer){
                  fs.writeFile(addedImage.location + addedImage._id + "." + addedImage.type, buffer, function (err) {
                    res.json({
                      image: addedImage
                    });
                  });
                });
            });
        } else {
          
        }

      });

    });

  });

  app.get('/*', function (req, res) {
    res.render('index');
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