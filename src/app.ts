import express from 'express'
import passport from 'passport'
import { BreweriesPipeline } from './etl/pipelines/breweries'
import './middleware/auth'
import { genToken } from './middleware/auth'

const app = express()
const port = process.env['PORT'] || 3000

app.post('/token', async function (_, res) {
  //   // Generate JWT token
  const token = genToken()
  res.status(200).json({ token })
})

app.get('/breweries', passport.authenticate('jwt', { session: false }), async (_, res) => {
  // This terniary op here is a dirty hack,
  // I need to fix it in jest / ts / config to handle this better.
  const breweries =
    process.env['NODE_ENV'] === 'test'
      ? await BreweriesPipeline
      : await BreweriesPipeline()
  res.send(breweries)
})

app.get('/', async (_, res) => {
  res.send('You probably want to check <a href="/breweries">/breweries</a>')
})

const server = app.listen(port, () =>
  console.log(`[pipeline]: breweries running on  http://localhost:${port}/breweries`)
)

export default server
export { app }