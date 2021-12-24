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
      },
    });
    // console.log(userInfo);
    if (!userInfo) {
      return res.status(403).send({
        message: 'Forbidden',
      });
    }
    // console.log(req.body);
    const findUser = await Users.findOne({
      attributes: { exclude: ['password'] },
      where: {
        email: accessTokenData.email,
      },
    });
    const { emotions, emotion_level, contents, gourdkinds } = req.body;
    // console.log(data);
    const data = {
      emotions,
      emotion_level,
      contents,
      gourdKinds: gourdkinds,
      users_id: findUser.dataValues.id,
    };

    await Beans.create({ ...data });

    const newContent = await Beans.findOne({
      where: { emotions, emotion_level, contents, gourdKinds: gourdkinds, users_id: findUser.dataValues.id },
    });
    // console.log(newContent);
    res.send({ data: newContent.dataValues, message: 'ok' });
  },
};
