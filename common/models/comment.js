var loopback = require('loopback');

module.exports = function(Comment) {

  Comment.observe('before save', function(ctx, next) {
    var context = loopback.getCurrentContext();
    var instance = ctx.instance;

    if (ctx.isNewInstance) {
      if (context.active && context.active.accessToken && context.active.accessToken.userId) {
        instance.authorId = context.active.accessToken.userId;
      }
      instance.creationDate = new Date();
    }
    next();
  });
};
