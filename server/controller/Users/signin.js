const { Users } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');
const bcrypt = require('bcrypt');

module.exports = {
  post: async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;

    const user = await Users.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: 'invalid email or password' });
    } else {
      // 암호화된 암호가 해당 암호가 맞는지 bcrypt 이용하여 비교
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ message: 'invalid email or password' });
      }

      const accessToken = generateAccessToken(user.dataValues);

      sendAccessToken(res, accessToken);

      return res.status(201).json({
        message: 'Login Completed',
        userinfo: {
          accessToken,
          ...user.dataValues,
        },
      });
    }
  },
};
