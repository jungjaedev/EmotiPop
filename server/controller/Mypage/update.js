const { Users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const bcrypt = require('bcrypt');
const config = require('../../config/config.js');

module.exports = {
  patch: async (req, res) => {
    const accessTokenData = isAuthorized(req);
    // console.log(accessTokenData);

    if (!accessTokenData) {
      return res.status(401).json({ message: 'invalid access token' });
    } else {
      const { email } = accessTokenData;

      const hashed = await bcrypt.hash(req.body.password, config.bcrypt.saltRounds);

      console.log(hashed);

      await Users.update(
        {
          email: req.body.email,
          password: hashed,
          username: req.body.username,
        },
        { where: { email } }
      );

      const user = await Users.findOne({
        where: { email: req.body.email },
      });

      // console.log(user);

      return res.status(200).json({
        message: 'profile changed',
        data: {
          ...user.dataValues,
        },
      });
    }
  },
};
