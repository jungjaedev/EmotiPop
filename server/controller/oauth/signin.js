const { Users } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    // console.log(req.body);
    const email = req.body.user.email;
    const username = req.body.user.givenName;

    const userInfo = await Users.findOne({
      where: { email },
    });

    const accessToken = generateAccessToken(req.body.user);
    sendAccessToken(res, accessToken);
    // 유저 검색안되면 신규 유저 -> db에 등록
    if (!userInfo) {
      await Users.create({
        email,
        password: null,
        username,
      });
    }
    // console.log(`111`, username, 222, email);
    // console.log(user);
    return res.status(201).json({
      message: 'Google Login Completed',
      userinfo: {
        accessToken,
        username,
        email,
      },
    });
  },
};

