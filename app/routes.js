var lwip = require('lwip');
var fs = require('fs');
var Mailgun = require('mailgun-js');
var ExifImage = require('exif').ExifImage;

//Your api key, from Mailgun’s Control Panel
var api_key = 'key-67450a7ebf6ca4d9b351030681b8f1d5';

//Your domain, from the Mailgun Control Panel
var domain = 'email.samledb.com';

//Your sending email address
var noReplyAddress = 'no-reply@samledb.com';

var sendCodeMail = function (email, code, callback) {
  var mailgun = new Mailgun({apiKey: api_key, domain: domain});
  var data = {
    from: noReplyAddress,
    to: email,
    subject: 'Ny passordkode fra samledb',
    html: 'Heisann, skriv inn denne koden på reset-passordsiden <b>' + code + '</b><br><br>Hilsen SamleDB'
  };

  console.log(data);

  mailgun.messages().send(data, function (err, body) {
    //If there is an error, render the error page
    if (err) {
      callback({
        status: false
      });
    }
    else {
      callback({
        status: true
      });
    }
  });
};

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

  app.get('/api/search/console/:phrase', function (req, res, next) {

    var searchPhrase = req.params.phrase;
    dbQueries.searchConsoles(searchPhrase, function (results) {
      res.json(results);
    });
  });

  app.get('/api/search/publisher/:phrase', function (req, res, next) {

    var searchPhrase = req.params.phrase;
    dbQueries.searchPublishers(searchPhrase, function (results) {
      res.json(results);
    });
  });

  app.get('/api/reset/password/:email', function (req, res) {
    dbQueries.setPasswordCode(req.params.email, function (response){
      if(response.status) {
        sendCodeMail(response.email, response.code, function(mailResponse) {
          if(mailResponse.status) {
            res.json({
              status: true,
              statusMessage: "E-post sendt"
            });
          } else {
            res.json({
              status: false,
              statusMessage: "Kunne ikke sende e-post"
            });
          }
        });
      } else {

      }
    });
  });

  app.get('/api/reset/password/verify/:email/:code', function (req, res) {
    dbQueries.verifyPasswordCode(req.params.email, req.params.code, false, function (response) {
      res.json(response);
    });
  });

  app.post("/api/reset/password", function (req, res) {
    dbQueries.setPasswordFromCodeAndEmail(req.body.email, req.body.code, req.body.newPassword, function (response) {
      if(response.status) {
        res.json({
          status: true
        });
      } else {
        res.json({
          status: false
        });
      }
    })
  });

  app.get('/api/search/title/:phrase', function (req, res, next) {

    var searchPhrase = req.params.phrase;
    dbQueries.searchGames(searchPhrase, function (results) {
      res.json(results);
    });
  });

  app.post('/api/check/username', function (req,res,next) {
    dbQueries.getUserFromUsername(req.body.username, function (user) {

      if(user)
        res.json(user);
      else
        res.json(401, user);
    });
  });

  app.post('/api/get/user/complete', function (req,res,next) {
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

  app.get('/api/get/user/game/:gameId', function (req, res) {
    dbQueries.getGameFromId(req.params.gameId, function (game) {
      if(game) {
        dbQueries.getUserFromId(game.userId, function (user) {
          dbQueries.getCollectionFromId(game.collectionId, function (collection) {
            res.json({
              game: game,
              user: user,
              collection: collection
            })
          });
        });
      }
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

  app.post('/api/get/me/complete', function (req,res,next) {
    dbQueries.getSettings(function (settings) {
        dbQueries.getCollectionsFromUserId(req.user._id, function (collections) {
          dbQueries.getGamesForUserFromUserId(req.user_id, function (newGames) {
            res.json({
              games: newGames,
              newGames: newGames,
              user: req.user,
              settings: settings,
              collections: collections
            });
          });  
        });
      });
  });

  app.get('/api/me/collections', function (req, res, next) {
    dbQueries.getCollectionsFromUserId(req.user._id, function (collections) {
      
      res.json(collections);
    });
  });

  app.post('/api/me/bulk/delete', function (req, res) {
    var ids = req.body;
    dbQueries.deleteGames(ids, function (response) {
      res.json(response);
    });
  });

  app.post('/api/me/bulk/move', function (req, res) {
    var ids = req.body.games;
    var collectionId = req.body.collectionId;
    dbQueries.moveGames(ids, collectionId, function (response) {
      res.json(response);
    });
  });

  app.post('/api/me/bulk/copy', function (req, res) {
    var ids = req.body.games;
    var collectionId = req.body.collectionId;
    dbQueries.copyGames(ids, collectionId, function (response) {
      res.json(response);
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

  app.post("/api/me/update/description", function (req, res) {
    dbQueries.updateDescription(req.user._id, req.body.description, function () {
      res.json({
        description: req.body.description
      })
    });
  });

  app.post('/api/me/upload/userphoto', function (req, res) {
    console.log('kukken server');
    addImage(req.body.image, function (addedImage) {
      dbQueries.addImageToUser(req.user._id, addedImage._id, function () {
        res.json({
          imageId: addedImage._id
        });
      });
    });
  });

  app.post('/api/me/upload/photo', function (req, res) {
    console.log('uploaded photo');
    addImage(req.body.image, function (addedImage) {
        res.json({
          imageId: addedImage._id
        });
    });
  });


  app.post('/api/me/remove/userphoto', function (req, res) {
      dbQueries.removeImageFromUser(req.user._id, req.body.imageId, function () {
        res.json({
          imageId: req.body.imageId
        });
    });
  });


  app.post('/api/me/upload/profilephoto', function (req, res) {
    addImage(req.body.image, function (addedImage) {
      dbQueries.addProfileImageToUser(req.user._id, addedImage._id, function () {
        res.json({
          imageId: addedImage._id
        });
      });
    });
  });

  app.post('/api/me/upload/collectionphoto', function (req, res) {
    console.log('kom hit 0', req.body.collectionId);
    dbQueries.getCollectionFromId(req.body.collectionId, function (collection) {

      if(req.user._id.toString() == collection.collection.userId.toString()) {

        addImage(req.body.image, function (addedImage) {
          dbQueries.addCollectionPhotoToCollection(collection.collection._id, addedImage._id, function () {
            console.log('kom hit 2');
            res.json({
              imageId: addedImage._id
            });
          });
        });

      }
    });
  });

  app.get("/api/add/consoles", function (req,res) {
    dbQueries.addConsoles(function (docs) {
      res.json(docs);
    });
  });

  app.get("/api/add/publishers", function (req,res) {
    dbQueries.addPublishers(function (docs) {
      res.json(docs);
    });
  });

  app.get("/api/add/games", function (req,res) {
    dbQueries.addGames(function (docs) {
      res.json(docs);
    });
  });


  app.post('/api/add/game', function (req,res,next) {
    console.log('legger til spill');
    dbQueries.addGame(req.body, function (game) {
      res.json(game);
    });
  });

  app.post('/api/update/game', function (req,res,next) {

    dbQueries.updateGame(req.body, function (game) {
      res.json(game);
    });
  });


  app.post('/api/remove/game', function (req,res,next) {

    dbQueries.removeGame(req.body.gameId, function () {
      res.json({});
    });
  });

  app.post('/api/me/upload/image', function (req, res, next) {
    dbQueries.addImage(req.body.image, function (addedImage) {
      res.json({
        imageId: addedImage._id,
        image: addedImage
      });
    });
  });



  app.get('/api/send/testemail', function (req, res) {
    var mailgun = new Mailgun({apiKey: api_key, domain: domain});

    var data = {
      //Specify email data
      from: noReplyAddress,
      //The email to contact
      to: "jorgeja@gmail.com",
      //Subject and text data
      subject: 'Hello from Mailgun',
      html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?jorgeja@gmail.com">Click here to add your email address to a mailing list</a>'
    }

    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, function (err, body) {
      //If there is an error, render the error page
      if (err) {
        console.log("got an error: ", err);
        res.json('fail');
      }
      //Else we can greet    and leave
      else {
        //Here "submitted.jade" is the view file for this landing page
        //We pass the variable "email" from the url parameter in an object rendered by Jade
        res.json('success');
        console.log(body);
      }
    });
  });

  app.get('/*', function (req, res) {
    res.render('index');
  });

  var writeImageToFile = function (image, addedImage, callback) {
    image.toBuffer('jpg', {quality: 80}, function (err, buffer) {
      fs.writeFile(addedImage.location + addedImage._id + "." + addedImage.type, buffer, function (err) {
        callback(addedImage);
      });
    });
  };

  var constrainImage = function (image, callback) {
    var width = image.width();
    var height = image.height();
    if(width > 1400) {
      height = (image.height() / image.width()) * 1400;
      width = 1400;
    }
    image.resize(width, height, function (err, image) {
      callback(image);
    });
  }


  var addImage = function (newImageBuffer, callback) {
    dbQueries.addImage(function (addedImage) {

      var base64Data = newImageBuffer.replace(/^data:image\/jpeg;base64,/, '');
      var img = new Buffer(base64Data, 'base64');

      lwip.open(img, 'jpg', function (err, image) {

        new ExifImage({image: img}, function (error, exifData) {
          if(exifData && exifData.image) {
            if (exifData.image.Orientation == 2) {
              image.mirror("x", function (err, image) {
                constrainImage(image, function (image) {
                  writeImageToFile(image, addedImage, function (image) {
                    callback(image);
                  });
                });
              });
            }

            else if (exifData.image.Orientation == 3) {
              image.mirror("xy", function (err, image) {
                constrainImage(image, function (image) {
                  writeImageToFile(image, addedImage, function (image) {
                    callback(image);
                  });
                });
              });
            }

            else if (exifData.image.Orientation == 4) {
              image.mirror("y", function (err, image) {
                constrainImage(image, function (image) {
                  writeImageToFile(image, addedImage, function (image) {
                    callback(image);
                  });
                });
              });
            }

            else if (exifData.image.Orientation == 5) {
              image.rotate(90, function (err, image) {
                image.mirror("x", function (err, image) {
                  constrainImage(image, function (image) {
                    writeImageToFile(image, addedImage, function (image) {
                      callback(image);
                    });
                  });
                });
              });
            }

            else if (exifData.image.Orientation == 6) {
              image.rotate(90, function (err, image) {
                constrainImage(image, function (image) {
                  writeImageToFile(image, addedImage, function (image) {
                    callback(image);
                  });
                });
              });
            }

            else if (exifData.image.Orientation == 7) {
              image.rotate(-90, function (err, image) {
                image.mirror("x", function (err, image) {
                  constrainImage(image, function (image) {
                    writeImageToFile(image, addedImage, function (image) {
                      callback(image);
                    });
                  });
                });
              });
            }

            else if (exifData.image.Orientation == 8) {
              image.rotate(-90, function (err, image) {
                constrainImage(image, function (image) {
                  writeImageToFile(image, addedImage, function (image) {
                    callback(image);
                  });
                });
              });
            }

            else {
              constrainImage(image, function (image) {

                writeImageToFile(image, addedImage, function (image) {
                  callback(image);
                });
              });
            }
          } else {
            constrainImage(image, function (image) {

              writeImageToFile(image, addedImage, function (image) {
                callback(image);
              });
            });
          }

        });
      });
    });
  };

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