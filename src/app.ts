import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { BreweriesPipeline } from './etl/pipelines/breweries'
import './middleware/auth'
// import { Brewery } from './etl/types/brewery'
const app = express()
const port = 3000

const genToken = () => {
  return jwt.sign(
    {
      iss: 'etl',
      sub: 1,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 10000000)
    },
    'agusti'
  )
}

app.post('/token', async function (_, res) {
  //   // Generate JWT token
  const token = genToken()
  res.status(200).json({ token })
})

app.get('/breweries', passport.authenticate('jwt', { session: false }), async (_, res) => {
  // This terniary op is a dirty hack, I would need to fix it in jest/config to handle this better.
  const breweries =
    process.env['NODE_ENV'] === 'test'
      ? await BreweriesPipeline
      : await BreweriesPipeline()
  res.send(breweries)
})

app.get('/', async (_, res) => {
  res.send('You probably want to check <a href="/breweries">/breweries</a>')
})

// app.listen(port, () => {
//   return console.log(`[pipeline]: breweries running on  http://localhost:${port}/breweries`)
// })

// export default app

const server = app.listen(port, () => console.log(`[pipeline]: breweries running on  http://localhost:${port}/breweries`)
)

// EXPORT EXPRESS APP & SERVER CONNECTION
export default server
export { app }