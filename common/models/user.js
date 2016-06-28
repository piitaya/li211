var loopback = require('loopback');
var loopbackslug = require("loopback-slug");

module.exports = function(User) {
  User.observe('before save', function(ctx, next) {
    //your logic goes here
    loopbackslug.middleware(User, ctx, {
      fields: ['nums', 'proms'],
      slug: "slug",
      lowercase: true,
      separator: "''"
    }, function (err) {
      if (err) return next(err);
      else next();
    });
  });
};
