var loopback = require('loopback');
var boot = require('loopback-boot');
var passport = require('passport');
var randomstring = require('randomstring');

var app = module.exports = loopback();

// Add Counts Mixin to loopback
require('loopback-counts-mixin')(app);

// Create an instance of PassportConfigurator with the app instance
var PassportConfigurator = require('loopback-component-passport').PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
  app.start();
});

// Load the provider configurations
var config = {};
try {
  config = require('./providers.json');
} catch(err) {
  console.error('Please configure your passport strategy in `providers.json`.');
  console.error('Copy `providers.json.template` to `providers.json` and replace the clientID/clientSecret values with your own.');
  process.exit(1);
}
// Initialize passport
passportConfigurator.init();

// Set up related models
passportConfigurator.setupModels({
  userModel: app.models.user,
  userIdentityModel: app.models.userIdentity,
  userCredentialModel: app.models.userCredential
});
// Configure passport strategies for third party auth providers
for(var strategy in config) {
  var opts = config[strategy];

  opts.customCallback = function (req, res, next) {
    passport.authenticate(strategy, {session: false}, function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect(opts.failureRedirect);
      }
      // Add the tokens to the callback as params.
      var redirect = opts.successRedirect;

      redirect += "?access_token=" + info.accessToken.id + '&userId=' + user.id.toString();

      return res.redirect(redirect);
    }
  )(req, res, next);
};

opts.profileToUser = function(provider, profile, options) {
  // Let's create a user for that
  var profileEmail = profile.emails && profile.emails[0] &&
  profile.emails[0].value;
  var generatedEmail = (profile.username || profile.id) + '@loopback.gadz.org';
  var email = profileEmail ? profileEmail : generatedEmail;
  var password = randomstring.generate(16);
  var userObj = {
    email: email,
    password: password
  };
  userObj.lastname = profile.name.familyName;
  userObj.firstname = profile.name.givenName;
  userObj.photo = profile.photos[0].value;
  return userObj;
};

passportConfigurator.configureProvider(strategy, opts);
}
