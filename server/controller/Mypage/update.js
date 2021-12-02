const { Users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
    patch: async (req, res) => {
        const accessTokenData = isAuthorized(req);

        if (!accessTokenData) {
            return res.status(401).json({ message: 'invalid access token' });
        } else {
            const { email } = accessTokenData;
            // console.log(email);

            // Users에서 해당 사용자(email)에 일치하는 데이터 찾아서
            //

            Users.findOne({
                where: { email }
            })
            .then(user => {
                // console.log(user.dataValues);
                const { email } = user.dataValues;

                Users.update(
                    { 
                        email: req.body.email, 
                        password: req.body.password, 
                        username: req.body.username 
                    },
                    { where: { email } }
                )
                
                return res.status(200).json({
                    message: 'profile changed'
                })
            })
        }
    }
}