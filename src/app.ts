import express from 'express';
import BreweriesPipeline from "etl/pipelines/breweries"
import passport from 'passport'
const bodyParser = require('body-parser')

const app = express();
const port = 3000;
import jwt from 'jsonwebtoken'
// const jwt = require('jsonwebtoken');
// require('middlewares/passport')

import 'middlewares/passport'
const genToken = () => {
  return jwt.sign({
    iss: 'agusti',
    sub: 1,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 10000000)
  }, 'agusti');
}
app.use(bodyParser.json())

app.post('/register', async function (req, res, next) {
//   const { email, password } = req.body;
  
//   //Check If User Exists
//   // let foundUser = await User.findOne({ email });
//   // if (foundUser) {
//   //   return res.status(403).json({ error: 'Email is already in use'});
//   // }
 
//   const newUser = new User({ email, password})
//   await newUser.save()
//   // Generate JWT token
  const token = genToken()
  res.status(200).json({token})
});
app.get('/secret', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json("Secret Data")
})

app.get('/breweries', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const breweries = await BreweriesPipeline()
  res.send(breweries);
});

app.get('/', async (req, res) => {
  res.send('You probably want to check <a href="/breweries">/breweries</a>');
});

app.listen(port, () => {
    return console.log(`[pipeline]: breweries running on  http://localhost:${port}/breweries`);
});