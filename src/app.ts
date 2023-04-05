import express from 'express'
import passport from 'passport'
import { BreweriesPipeline } from './etl/pipelines/breweries'
import './middleware/auth'
import { genToken } from './middleware/auth'

const app = express()
const port = process.env['PORT'] || 3000

app.post('/token', async function (_, res) {
  // Generate JWT token
  const token = genToken()
  res.status(200).json({ token })
})
// We expose breweries pipeline in this endpoint, password protected
app.get('/breweries', passport.authenticate('jwt', { session: false }), async (_, res) => {
  try {
    const breweries = await BreweriesPipeline();
    res.send(breweries);
  } catch (error) {
    console.error('Error fetching breweries:', error);
    res.status(500).send('Internal Server Error');
  }
})

app.get('/', async (_, res) => {
  res.send('You probably want to check <a href="/breweries">/breweries</a>')
})

const server = app.listen(port, () =>
  console.log(`[pipeline]: breweries running on  http://localhost:${port}/breweries`)
)

export default server
export { app }