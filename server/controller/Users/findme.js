const { Users, Auths } = require('../../models');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const config = require('../../config/config.js');
const { sendEmailUser, sendEmailPass } = process.env;

module.exports = {
    post: async (req, res) => {
        // 1. 비밀번호 초기화 요청  -> 인증키 발급 & 인증키 이메일 전송 

        // 2. 이메일 확인 -> 새로운 비밀번호 입력 -> 인증키 확인

        // 3. 비밀번호 초기화 -> 초기화 완료
        // email 입력 확인
        if (req.body.email === '') { 
            return res.status(400).json({ message: 'Please type your email' });
        }

        // Users DB에 있는지 확인
        const existUser = await Users.findOne({
            where: { email: req.body.email }
        });

        // console.log(existUser);

        const { id, email, password, username } = existUser.dataValues;

        // 인증토큰 생성
        // email을 입력받게 되면 서버에서는 인증키 역할을 한 token 생성함
        // crypto 이용 
        const token = crypto.randomBytes(20).toString('hex'); 
        const data = {
            token,
            users_id: id,
            ttl: 300 // ttl값 설정 5분 (token 유효시간 설정)
        };
        await Auths.create(data); // Auth테이블에 입력

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            port: 535,
            secure: true,
            auth: {
                user: sendEmailUser,
                pass: sendEmailPass,
            },
        });

        // console.log(transporter, 'transporter!!!!!');

        const emailOptions = {
            from: sendEmailUser,
            to: email,
            subject: '비밀번호 초기화 이메일입니다',
            html: '비밀번호 초기화를 위해서는 아래의 URL을 클릭하세요' + '<br />' +`http://localhost:8080/reset/${token}`
        };

        transporter.sendMail(emailOptions, res); //전송
        
        return res.json({ message: 'ok', data: { token } })
    },

    reset: async (req, res) => {
        const ttl = 300;
        const auth = await Auths.findOne({
            where: {
                token: req.params.token,
            }
        });

        const hashed = await bcrypt.hash(req.body.password, config.bcrypt.saltRounds);

        await Users.update({
            password: hashed
        }, 
            { where: { id: auth.dataValues.users_id } 
        });

        const user = await Users.findOne
        ({
            where: { id: auth.dataValues.users_id }
        });
        // console.log(user);

        return res.status(201).json({
            message: 'reset your password completed',
            data: {
                ...user.dataValues
            }
        })
    }
}
