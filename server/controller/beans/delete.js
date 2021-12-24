const { Users, Beans } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  delete: async (req, res) => {
    const auth = async (req, res) => {
      if (!req.headers['authorization']) {
        return res.status(401).send({
          message: 'invalid access token',
        });
      }

      const accessTokenData = isAuthorized(req);
      // console.log(accessTokenData);
      const userInfo = await Users.findOne({
        attributes: { exclude: ['password'] },
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
    };
    auth(req, res);

    const beansInfo = await Beans.findOne({
      where: {
        id: req.params.beans_id,
      },
    });
    if (!beansInfo) {
      res.status(404).send({
        message: 'not found',
      });
    }
    // console.log(beansInfo.dataValues);
    await Beans.destroy({
      where: { id: req.params.beans_id },
    });

    res.send({
      message: 'delete completed',
    });
  },
};
