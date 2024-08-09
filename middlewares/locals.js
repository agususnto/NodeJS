const locals = (req, res, next) => {
    res.locals.user = req.session.userId;
    next();
  };
  
  module.exports = locals;