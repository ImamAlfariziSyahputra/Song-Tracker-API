const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const { User, sequelize } = require('./models');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/hello', (req, res) => {
  res.send({
    message: 'Hello',
  });
});

app.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.send(user.toJSON());
  } catch (err) {
    res.status(400).send({
      error: 'This email account is already in use',
    });
  };
});

sequelize.sync()
.then(() => {
  app.listen(config.port);
  console.log(`Started on port ${config.port}`);
});