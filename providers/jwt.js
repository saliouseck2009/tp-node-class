const jwt = require('jsonwebtoken');

module.exports = {
  sign(payload) {
    const createdAt = new Date();
    const token = jwt.sign(
      { ...payload, expiresIn: 30 * 24 * 60 * 60, createdAt },
      process.env.JWT_SECRET,
      // {
      //   expiresIn: 86400, // expires in 24 hours
      // },
    );
    return {
      token,
      expiresIn: 30 * 24 * 60 * 60,
      createdAt,
    };
  },

  verify(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  },
};