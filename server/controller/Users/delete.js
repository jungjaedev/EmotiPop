const { Users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
    remove: async (req, res) => {
        // console.log(req.params);
        const { user_id } = req.params;

        const accessTokenData = isAuthorized(req);
        
        const { id } = accessTokenData;

        const userInfo = await Users.findOne({
            where: { id }
        });
        
        if (userInfo.dataValues.id !== Number(user_id)) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await Users.destroy({
            where: { id: user_id }
        });

        return res.status(200).json({ message: 'your info is deleted successfully' })
    }
}