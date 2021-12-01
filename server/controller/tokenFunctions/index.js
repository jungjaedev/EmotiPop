require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
    generateAccessToken: data => {
        // Access token으로 sign합니다.
        return sign(data, process.env.ACCESS_SECRET, {
        expiresIn: '30d',
        });
    },
    sendAccessToken: (res, accessToken) => {
        // JWT 토큰을 쿠키로 전달합니다.
        res
        .cookie('jwt', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })
        .json({ message: 'ok', accessToken})
        .end();
    },
    isAuthorized: req => {
        const authorization = req.headers['authorization'];
        // console.log(authorization)
        if (!authorization) {
            return null;
        }
        const token =  authorization.split(' ')[1];
        // console.log(token);

        try {
            return verify(token, process.env.ACCESS_SECRET);
        } catch (err) {
        return null
        }
    }
};
