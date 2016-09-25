// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var bcrypt = require('bcrypt-nodejs');
var slug = require('slug');


// expose this function to our app using module.exports
module.exports = function(passport, models, dbQueries) {

    var User = models.User;

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log(user);
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({'username': req.body.username}, function (err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {
                    var newUser = new User({
                        username: username,
                        password: bcrypt.hashSync(password),
                        profileImageUrl: '',
                        coverPhotoUrl: '',
                        role: 'moderator',
                        nick: req.body.nick,
                        slug: slug(req.body.nick),
                        created: new Date()
                    });

                    newUser.save(function(err) {
                        if(err)
                            throw err;
                        dbQueries.addCollection(newUser.nick + "s samling", newUser._id, "collections", function () {
                            dbQueries.addCollection(newUser.nick + "s ønskeliste", newUser._id, "goals", function () {
                                dbQueries.addCollection(newUser.nick + "s salgsliste", newUser._id, "sales", function () {
                                    return done(null, newUser);
                                });
                            });
                        });
                        
                    });
                }
            });
        })  
    );


    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
            User.findOne({'username': username}, function (err, user) {
                if(err)
                    return done(err);

                if(!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));

                if(!bcrypt.compareSync(password, user.password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                return done(null, user);
            });
        })
    );
}