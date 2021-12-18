const { Users } = require('../../models')
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
    get: async (req, res) => {
        const accessTokenData = isAuthorized(req);
        // console.log(accessTokenData);

        if (!accessTokenData) {
            return res.status(401).json({ message: 'invalid access token' });
        } else {
            const { email } = accessTokenData;
            // console.log(email);

            const userInfo = await Users.findOne({
                where: { email }
            });
            // console.log(userInfo.dataValues);

            if (!userInfo) {
                return res.json({
                    data: null,
                    message: 'access token has been tempered'
                });
            } else {
                delete userInfo.dataValues.password;
                return res.status(200).json({
                    userinfo: {
                        id: userInfo.dataValues.id,
                        username: userInfo.dataValues.username,
                        email: userInfo.dataValues.email                        
                    },
                    message: 'get your information completed'
                })
            }
        }
    }
}