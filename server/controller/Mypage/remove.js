const { Users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
    remove: async (req, res) => {
        const accessTokenData = isAuthorized(req);
        // console.log(accessTokenData);
    
        if (!accessTokenData) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const { id } = accessTokenData;

        await Users.destroy({ where: {id} });

        return res.status(200).json({ message: 'successfully Deleted!!' });
    }
}