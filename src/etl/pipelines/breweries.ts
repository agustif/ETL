import { Pipeline } from 'etl/index'
import { Format } from 'etl/extractors/rest'
// import {removeAttributes } from './transformations/removeNull'
// import {convertCasing} from './transformations/convertCasing'
const restEndpoint = process.env.SOURCE_REST_ENDPOINT || 'https://api.openbrewerydb.org/breweries'
export default async function BreweriesPipeline() {
    const BreweriesPipeline = await (await new Pipeline()
        .restExtractor({ endpoint: restEndpoint, format: Format.Json }) // We pass an URL which is expected to be a rest endpoint that returns a json file.
    ) // We pass an URL which is expected to be a rest endpoint that returns a json file.
        .removeAttribute('NULL') // Removes any attributes that have null values
        // .result()
        // .convertCasing({ in: "keys", from: 'snake', to: 'camel' }) // Convert (keys|attributes|all) casing from snake to camel case.
        // .groupBy('state',  { orderBy: 'created_at', order: 'asc' }) // groups all entries by state atrribute, and sorts inside each state by created_at, ascending order, so most recent ones are shown.
        // .addUSRegion({ lat: 'lat', long: 'long', output: "us_region", ifEmptyOrNull: "remove" }) // Adds a new attribute region calculated from lat/long attributes. Removes anynulllat/long
        // .loadAsJson()
    return BreweriesPipeline.finish
}
