const { Restaurant } = require('../models/Restaurant');

let auth2 = (req, res, next) => {
  let token = req.cookies.w_auth;
  Restaurant.findByToken(token, (err, restaurant) => {
    if (err)
      throw err;
    if (!restaurant)
      return res.json({
        isAuth: false,
        error: true
      });

    req.token = token;
    req.restaurant = restaurant;
    next();
  });
};

module.exports = { auth2 };