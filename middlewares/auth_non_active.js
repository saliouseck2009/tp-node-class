const { jwt } = require('./../providers');
let User  = require('./../models/user.model');

module.exports = async (req, res, next) => {
  try {
    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token);
    
    req.phone = decodedToken.phone;
    
    const exist = await User.findOne({phone: decodedToken.phone});
    
    if (!exist) {
      console.log(exist);
      res.status(401).send({error: 'token invalid.'});
      return;
    }
    req.userID = exist._id;
    next();
  } catch(error) {
    console.log(error);
    res.status(401).send({error: 'token invalid'});
  }
};
