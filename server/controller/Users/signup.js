const { Users } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = {
    post: async (req, res) => {
        // email, password, username req.body로 받아오기
        // console.log(req.body);
        const { email, password, username } = req.body;

        // 셋 중에 하나라도 비어 있으면 422 코드 전송
        if (!email || !password || !username) {
            return res.status(422).json({ message: "insufficient parameters supplied" })
        } else { 
            const [userInfo, created] = await Users.findOrCreate({
                where: { email },
                defaults: { email, password, username }
            });

            // 이메일 중복시 409 error
            if (!created) {
                return res.status(409).json({ message: `${email} already exists` });
            } else {
                const { id, username, email } = userInfo.dataValues;
                // 비밀번호 삭제후 accessToken 생성
                delete userInfo.dataValues.password;
                
                // accessToken 생성
                // console.log(userInfo.dataValues)
                const accessToken = generateAccessToken(userInfo.dataValues);

                sendAccessToken(res, accessToken);
                
                return res.status(201).json({
                    message: 'Signup Completed',
                    userInfo: {
                        id,
                        username,
                        email,
                        accessToken
                    }
                })
            }
        }
    }
}