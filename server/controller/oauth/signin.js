// const {OAuth2Client} = require('google-auth-library');
// const CLIENT_ID = '';
// const client = new OAuth2Client(CLIENT_ID);
// 구글 로그인
module.exports = {
  post: async (req, res) => {
    // let token = req.body.token;
    // // console.log(token);
    // async function verify() {
    //   const ticket = await client.verifyIdToken({
    //       idToken: token,
    //       audience: CLIENT_ID,
    //   });
    //   const payload = ticket.getPayload();
    //   const userid = payload['sub'];
    //   // console.log(payload)
    // }
    // verify()
    // .then(() => {
    //   res.cookie('token', token);
    //   res.send('success');
    // })
    // .catch(console.error);
  },
};
// npm install google-auth-library --save
