const { Beans } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const beansInfo = await Beans.findOne({
      where: {
        id: req.params.beans_id,
      },
    });
    if (!beansInfo) {
      res.status(404).send({
        message: 'Not Found!',
      });
    }
    // console.log(beansInfo.dataValues);
    res.send({
      data: beansInfo.dataValues,
      message: 'ok',
    });
  },
};
