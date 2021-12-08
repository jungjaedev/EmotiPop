const { Users, Beans } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    if (!req.headers['authorization']) {
      return res.status(401).send({
        message: 'invalid access token',
      });
    }

    const accessTokenData = isAuthorized(req);
    // console.log('---------', accessTokenData);
    const userInfo = await Users.findOne({
      attributes: { exclude: ['password'] },
      where: {
        email: accessTokenData.email,
        username: accessTokenData.username,
      },
    });
    // console.log(userInfo);
    if (!userInfo) {
      res.status(403).send({
        message: 'Forbidden',
      });
    }
    // console.log(req.body);
    const { emotions, emotion_level, contents, gourdkinds } = req.body;
    // console.log(data);
    const data = {
      emotions,
      emotion_level,
      contents,
      gourdKinds: gourdkinds,
      users_id: accessTokenData.id,
    };

    await Beans.create({ ...data });

    const newContent = await Beans.findOne({
      where: { emotions, emotion_level, contents, gourdKinds: gourdkinds, users_id: accessTokenData.id },
    });
    console.log(newContent);
    res.json({ data: newContent, message: 'ok' });
  },
};
