const { Users, Beans } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
    get: async (req, res) => {
        // 해당되는 날짜에 작성한 콩주머니가 하나라도 있으면 달력에 표시
        if (!req.headers['authorization']) {
            return res.status(401).send({
                message: 'invalid access token',
            });
        }

        const accessTokenData = isAuthorized(req);

        const userInfo = await Users.findOne({
            where: {
                email: accessTokenData.email
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

        const allBeans = await Beans.findAll({
            where: { users_id }
        })
        // console.log(allBeans);

        const dateArr = [];
        allBeans.map(Bean => {
            const createdAt = Bean.dataValues.createdAt;
            const year = createdAt.getFullYear();
            const month = createdAt.getMonth() + 1;
            const date = Bean.dataValues.createdAt.getDate();
            console.log(createdAt);
            dateArr.push(`${year}-${month}-${date}`);
        })
        // console.log(dateArr);

        const noOverlap = Array.from(new Set(dateArr));

        res.status(200).json({
            message: 'date checked completed',
            data: noOverlap
        })

    }
}