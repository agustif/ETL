import { Pipeline } from 'etl/index'
import { Format } from 'etl/extractors/rest'
// import {removeAttributes } from './transformations/removeNull'
// import {convertCasing} from './transformations/convertCasing'
const restEndpoint = process.env.BREWERIES_REST_ENDPOINT || 'https://api.openbrewerydb.org/breweries'

export default async function BreweriesPipeline() {
    const BreweriesPipeline = (
        await new Pipeline()
        .restExtractor({ endpoint: restEndpoint, format: Format.Json })
    )
    .removeAttribute('NULL')
        // Removes any attributes that have null values
    .convertCasingKeys({ from: 'snake', to: 'camel' })
    // Convert (keys|attributes|all) casing from snake to camel case.
    .addUSRegion({ lat: 'lat', long: 'long', output: "us_region", ifEmptyOrNull: "remove" }) 
    // Adds a new attribute region calculated from lat/long attributes. Removes anynulllat/long
    .groupBy({ group: 'state', orderBy: 'createdAt', order: 'asc' })
    // groups all entries by state atrribute, and sorts inside each state by created_at, ascending order, so most recent ones are shown.

    return BreweriesPipeline.pipelineResult // needed to call after chaining extractors/transformations into our Pipeline to return it's final results!
}
