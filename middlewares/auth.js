const { jwt } = require('./../providers');
let User  = require('./../models/user.model');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token);
    req.phone = decodedToken.phone;
    const exist = await User.find({
        phone: decodedToken.phone,
        active: 'active'
    });
    console.log(exist.length);
    if (!exist || !exist.length) {
      res.status(401).send({error: 'token invalid.'});
      return;
    }
    req.userID = exist[0]._id;
    next();
  } catch(error) {
    console.log(error);
    res.status(401).send({error: 'token invalid'});
  }
};
