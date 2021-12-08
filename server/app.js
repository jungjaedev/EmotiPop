const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const beansRouter = require('./router/beans.js');
const usersRouter = require('./router/users.js');
const oauthRouter = require('./router/oauth.js');
const mypageRouter = require('./router/mypage.js');
const statsRouter = require('./router/stats.js');

dotEnv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
<<<<<<< HEAD
    origin: ['http://localhost:19003', 'http://emotipop.com'],
=======
    origin: ['http://localhost:19006', 'http://emotipop.com'],
>>>>>>> 836d5a1a43e8992e6f5a8cca751e1be58d7446f7
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  })
);
app.use(cookieParser());

app.use('/beans', beansRouter);
app.use('/oauth', oauthRouter);
app.use('/users', usersRouter);
app.use('/mypage', mypageRouter);
app.use('/stats', statsRouter);

app.get('/', (req, res, next) => {
  res.send('Hello from API Server');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
