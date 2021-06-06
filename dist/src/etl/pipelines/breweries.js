"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreweriesPipeline = void 0;
const etl_1 = require("etl");
const rest_1 = require("etl/extractors/rest");
// import {removeAttributes } from './transformations/removeNull'
// import {convertCasing} from './transformations/convertCasing'
const restEndpoint = process.env.SOURCE_REST_ENDPOINT || 'https://api.openbrewerydb.org/breweries';
function BreweriesPipeline() {
    const breweriesPipeline = new etl_1.Pipeline()
        // First we call one of our extractor methods in order to initialize our pipeline with some data.
        .restExtractor({ endpoint: restEndpoint, format: rest_1.Format.Json }); // We pass an URL which is expected to be a rest endpoint that returns a json file.
    // .removeAttribute('null') // Removes any attributes that have null values
    // .convertCasing({ in: "keys", from: 'snake', to: 'camel' }) // Convert (keys|attributes|all) casing from snake to camel case.
    // .groupBy('state',  { orderBy: 'created_at', order: 'asc' }) // groups all entries by state atrribute, and sorts inside each state by created_at, ascending order, so most recent ones are shown.
    // .addUSRegion({ lat: 'lat', long: 'long', output: "us_region", ifEmptyOrNull: "remove" }) // Adds a new attribute region calculated from lat/long attributes. Removes anynulllat/long
    // .loadAsJson()
    // .return()
    console.log(breweriesPipeline);
    return breweriesPipeline;
}
exports.BreweriesPipeline = BreweriesPipeline;
//# sourceMappingURL=breweries.js.map