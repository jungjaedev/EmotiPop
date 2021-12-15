const { Users, Beans } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const sequelize = require('sequelize');
const { Op } = require('sequelize');

module.exports = {
  get: async (req, res) => {
    if (!req.headers['authorization']) {
      return res.status(401).send({
        message: 'invalid access token',
      });
    }
    // console.log('---------');
    const accessTokenData = isAuthorized(req);
    // console.log('---------', accessTokenData);
    const userInfo = await Users.findOne({
      attributes: { exclude: ['password'] },
      where: {
        email: accessTokenData.email,
        // username: accessTokenData.username,
      },
    });
    // console.log(userInfo);
    if (!userInfo) {
      res.status(403).send({
        message: 'Forbidden',
      });
    }

    const users_id = userInfo.dataValues.id;
    // console.log(users_id);

    // console.log(`11111`);
    // console.log(month);
    // 전체조회
    const allBeans = await Beans.findAll({
      where: { users_id },
    });
    // console.log(allBeans);
    //
    // ToDO : 게시글 조회안되면
    if (Object.keys(allBeans).length < 1) {
      return res.status(400).send({
        message: 'no data',
      });
    }

    const allEmotions = [];
    allBeans.map(bean => {
      allEmotions.push(bean.dataValues.emotions);
    });
    // console.log(allEmotions);

    const emotion = {};
    allEmotions.forEach(el => {
      emotion[el] = (emotion[el] || 0) + 1;
    });
    // console.log(emotion);

    // 월별조회
    date = new Date();
    const month = await Beans.findAll({
      where: {
        [Op.and]: [
          sequelize.where(sequelize.fn('month', sequelize.col('createdAt')), date.getMonth() + 1),
          sequelize.where(sequelize.fn('year', sequelize.col('createdAt')), date.getFullYear()),
          { users_id },
        ],
      },
    });
    const monthEmotions = [];
    month.map(bean => {
      monthEmotions.push(bean.dataValues.emotions);
    });

    const monthEmotion = {};
    monthEmotions.forEach(el => {
      monthEmotion[el] = (monthEmotion[el] || 0) + 1;
    });

    // console.log(`monthEmotion`, monthEmotion);
    /** 
    const emotionArr = [];
    for (let key in emotion) {
      emotionArr.push({ [key]: emotion[key] });
    }
    */
    // console.log(emotionArr);
    // console.log(Object.entries(emotion));

    res.send({
      message: 'ok',
      emotion,
      month: monthEmotion,
    });
  },
};
