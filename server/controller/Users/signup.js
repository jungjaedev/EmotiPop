const { Users } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');
const bcrypt = require('bcrypt');
const config = require('../../config/config.js');

module.exports = {
    post: async (req, res) => {
        // email, password, username req.body로 받아오기
        // console.log(req.body);
        const { email, password, username } = req.body;

        // 셋 중에 하나라도 비어 있으면 422 코드 전송
        if (!email || !password || !username) {
            return res.status(422).json({ message: "insufficient parameters supplied" })
        } else { 
            const found = await Users.findOne({ where: { email } });

            // 이메일 중복시 409 error
            if (found) {
                return res.status(409).json({ message: `${email} already exists` });
            } else {
                // 비밀번호 삭제하지 말고 bcrypt 이용하여 암호화 시켜주자.

                const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
                const userInfo = await Users.create({
                    email,
                    password: hashed,
                    username
                })
                console.log(userInfo);
                // accessToken 생성
                // console.log(userInfo.dataValues)
                const accessToken = generateAccessToken(userInfo.dataValues);

                sendAccessToken(res, accessToken);
                
                return res.status(201).json({
                    message: 'Signup Completed',
                    userinfo: {
                        accessToken,
                        ...userInfo.dataValues
                    }
                })
            }
        }
    }
}