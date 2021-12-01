const { Users, Beans } = require('../../models');
const { isAuthorized } = require('../tokenFunction');

module.exports = {
  post: async (req, res) => {
    if (!req.headers['authorization']) {
      return res.status(401).send({
        message: 'invalid access token',
      });
    }

    const accessTokenData = isAuthorized(req);
  },
};
