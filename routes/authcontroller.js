const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../data/config');

router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(bodyParser.json());

function create_token(user) {
  // create a token
  var token = jwt.sign({
    id: user._id
  }, config.get('PASSWORD'), {
    expiresIn: 86400 // expires in 24 hours
  });

  return token;
}

register = {
  '$2a$10$xh..3OrhOe23Rf7ynzlLbuYZ18j4pH4ler6vqa69GsuYgt9y0sVx2': 0xc0c,
};

router.post('/', (req, res) => {
  var hashedPassword = bcrypt.hashSync(req.body.password, 11);
  console.log(hashedPassword);
  user = new User.User(
    req.body.name,
    req.body.email,
    hashedPassword);

  for (password in register) {
    console.log(req.body.password);
    bcrypt.compare(req.body.password, hashedPassword, (error, result) => {
      if (result == false) {
        res.status(401).json({
          status: 'unauthorized'
        })
        return;
      }
    });
  }

  user._id = register[hashedPassword];

  // create a token
  var token = create_token(user);

  res.status(200).send({
    auth: true,
    token: token
  });
});

module.exports = router;
