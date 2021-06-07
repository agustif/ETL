import express from 'express';
import passport from 'passport'
import jwt from 'jsonwebtoken'
import BreweriesPipeline from "etl/pipelines/breweries"
import 'middlewares/passport'

const app = express();
const port = 3000;

const genToken = () => {
  return jwt.sign({
    iss: 'etl',
    sub: 1,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 10000000)
  }, 'agusti');
}

app.post('/register', async function (_, res) {
//   // Generate JWT token
  const token = genToken()
  res.status(200).json({token})
});

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