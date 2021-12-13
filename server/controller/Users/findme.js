const { Users } = require('../../models');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const config = require('../../config/config.js');
const { sendEmailUser, sendEmailPass } = process.env;

module.exports = {
    post: async (req, res) => {
        // email 입력 확인
        if (req.body.email === '') { 
            return res.status(400).json({ message: 'Please type your email' });
        }

        // Users DB에 있는지 확인
        const existUser = await Users.findOne({
            where: { email: req.body.email }
        });

        if (!existUser) {
            return res.status(401).json({ message: "this email doesn't exist" });
        }

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
        const tempPass = Math.random().toString(36).slice(2);
        // console.log(tempPass);

        // 임시비밀번호로 사용자 비밀번호 변경하기
        const hashed = await bcrypt.hash(tempPass, config.bcrypt.saltRounds);

        await Users.update({
            password: hashed
        }, { where: { email: req.body.email } });

        const emailOptions = {
            from: sendEmailUser,
            to: req.body.email,
            subject: '임시 비밀번호 발급 이메일입니다',
            html: '임시 비밀번호입니다.<br /> 로그인 후 반드시 비밀번호 변경을 하셔야 합니다.' + '<br />' + tempPass
        };
        transporter.sendMail(emailOptions, res); //전송
        
        return res.json({ message: 'sending temporary password completed!!' });
    },
}