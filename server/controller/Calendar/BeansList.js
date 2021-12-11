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

    const accessTokenData = isAuthorized(req);

    const userInfo = await Users.findOne({
      where: {
        email: accessTokenData.email,
      },
    });
    // console.log(userInfo);
    if (!userInfo) {
      res.status(403).send({
        message: 'Forbidden',
      });
    }
    const users_id = userInfo.dataValues.id;

    const date = req.params.calendar_id;
    const { gourdKinds } = req.params;
    // console.log(users_id);
    // console.log(date);

    const pickYear = date.split('-')[0];
    const pickMonth = date.split('-')[1];
    const pickDate = date.split('-')[2];
    const beansList = await Beans.findAll({
      where: {
        [Op.and]: [
          sequelize.where(sequelize.fn('year', sequelize.col('createdAt')), pickYear),
          sequelize.where(sequelize.fn('month', sequelize.col('createdAt')), pickMonth),
          sequelize.where(sequelize.fn('day', sequelize.col('createdAt')), pickDate),
          { users_id },
          { gourdKinds },
        ],
      },
    });

    const beansArray = [];

    beansList.map(beans => {
      // console.log(beans.dataValues);
      beansArray.push(beans.dataValues);
    });
    // console.log(beansArray);
    res.status(200).json({
      message: 'beanslist get completed',
      data: beansArray,
    });
  },
};
