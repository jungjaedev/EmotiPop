const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');

dotEnv.config();

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://emotipop.com'],
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  })
);

app.get('/', (req, res, next) => {
  res.send('Hello from API Server');
});

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
