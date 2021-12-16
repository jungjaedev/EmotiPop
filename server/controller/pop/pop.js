const { Beans, Users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { Op } = require('sequelize');

module.exports = {
  get: async (req, res) => {
    if (!req.headers['authorization']) {
      return res.status(401).send({
        message: 'invalid access token',
      });
    }

    const accessTokenData = isAuthorized(req);
    // console.log(accessTokenData);
    const findUser = await Users.findOne({
      where: { email: accessTokenData.email },
    });
    // 일요일마다 '긍정' '부정' 중에
    // 콩주머니를 더 많이 맞은 박이 터짐
    //console.log('----', accessTokenData)
    const sixDaysAgo = new Date(new Date().setDate(new Date().getDate() - 6));
    // console.log(sevenDaysAgo);
    const beans = await Beans.findAll({
      where: {
        createdAt: {
          [Op.gt]: sixDaysAgo,
          [Op.lt]: new Date(),
        },
        users_id: findUser.dataValues.id,
      },
    });

    // console.log("beans : 00",beans);
    let posCount = 0;
    let negCount = 0;

    beans.forEach(bean => {
      if (bean.dataValues.gourdKinds === true) {
        posCount++;
      } else {
        negCount++;
      }
    });
    console.log('pos : ', posCount);
    console.log('neg : ', negCount);
    if (posCount > negCount) {
      return res.status(201).json({
        message: 'Positive Gourd Win',
      });
    } else if (posCount < negCount) {
      return res.status(201).json({
        message: 'Negative Gourd Win',
      });
    } else {
      return res.status(201).json({
        message: 'Positive & Negative Draw',
      });
    }
  },
};
