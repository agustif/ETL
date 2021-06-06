import express from 'express';
import {BreweriesPipeline} from "etl/pipelines/breweries"
const app = express();
const port = 3000;


app.get('/', (req, res) => {
  const breweries = BreweriesPipeline()
  console.log(breweries)
  res.send('Hello from express');
});
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});