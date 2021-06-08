import { Pipeline } from 'etl/index'
import { Format } from 'etl/extractors/rest'
import { RemoveOptions } from 'etl/transformations/removeAttribute'
import { convertCasingFromOptions, convertCasingToOptions } from 'etl/transformations/convertCasingKeys'
import { ifEmptyOrNullOptions } from 'etl/transformations/addUSRegion'
import { GroupOptions, OrderByOptions, OrderOptions } from 'etl/transformations/groupBy'
const restEndpoint = process.env['BREWERIES_REST_ENDPOINT'] || 'https://api.openbrewerydb.org/breweries'

export default async function BreweriesPipeline() {
    const BreweriesPipeline = (
        await new Pipeline()
            .restExtractor({
                endpoint: restEndpoint,
                format: Format.Json,
                randomCreatedAt: true
            })
    )
        .removeAttribute({ attribute: RemoveOptions.Null })
        // Removes any attributes that have null values
        .convertCasingKeys({ from: convertCasingFromOptions.Snake, to: convertCasingToOptions.Camel })
        // Could be expanded to Convert (keys|values|both) casing from snake to camel case.
        .addUSRegion({
            input: { lat: 'latitude', long: 'longitude' },
            ifEmptyOrNullLatLong: ifEmptyOrNullOptions.Remove
        })
        // Adds a new attribute region calculated from lat/long attributes. Removes anynulllat/long
        .groupBy({ group: GroupOptions.State, orderBy: OrderByOptions.CreatedAt, order: OrderOptions.Ascendent })
    // groups all entries by state atrribute, and sorts inside each state by created_at, ascending order, so most recent ones are shown.
    return BreweriesPipeline.finished
    // needed to call after chaining extractors/transformations into our Pipeline to return it's final results!
}
