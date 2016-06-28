var loopback = require('loopback');
var loopbackslug = require("loopback-slug");

module.exports = function(Job) {
  Job.observe('before save', function(ctx, next) {
    //your logic goes here
    loopbackslug.middleware(Job, ctx, {
      fields: ['title', 'company'],
      slug: "slug",
      lowercase: true,
      separator: "-"
    }, function (err) {
      if (err) return next(err);
      else next();
    });
  });

  Job.observe('before save', function(ctx, next) {
    var context = loopback.getCurrentContext();
    var instance = ctx.instance;

    if (ctx.isNewInstance) {
      if (context.active && context.active.accessToken && context.active.accessToken.userId) {
        instance.authorId = context.active.accessToken.userId;
      }
      instance.creationDate = new Date();
    }
    else {
      instance.modificationDate = new Date();
    }
    next();
  });
};
