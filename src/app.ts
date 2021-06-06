import express from 'express';
import BreweriesPipeline from "etl/pipelines/breweries"

const app = express();
const port = 3000;

app.get('/breweries', async (req, res) => {
  const breweries = await BreweriesPipeline()
  res.send(breweries);
});

app.get('/', async (req, res) => {
  res.send('You probably want to check <a href="/breweries">/breweries</a>');
});

app.listen(port, () => {
    return console.log(`[pipeline]: breweries running on  http://localhost:${port}/breweries`);
});