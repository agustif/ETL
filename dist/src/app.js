"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const breweries_1 = require("./etl/pipelines/breweries");
const app = express_1.default();
const port = 3000;
app.get('/', (req, res) => {
    const breweries = breweries_1.BreweriesPipeline();
    console.log(breweries);
    res.send('Hello from express');
});
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map