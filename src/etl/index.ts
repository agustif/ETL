import restExtractor, { RestExtractorOptions } from 'etl/extractors/rest'
import removeAttribute from 'etl/transformations/removeAttribute'
import convertCasingKeys from 'etl/transformations/convertCasingKeys'
import groupBy from 'etl/transformations/groupBy'
import addUSRegion from 'etl/transformations/addUSRegion'

import { Brewery } from 'etl/types/brewery'
class Pipeline {
    result: Brewery[];
    constructor() {
        this.result = []
    }
    get finished() {
        return this.result;
    }
    async restExtractor(...args: RestExtractorOptions[]) {
        this.result =  await restExtractor(args[0]);
        return this
    }
    removeAttribute(...args: any) {
        this.result = removeAttribute({ config: args[0], data: this.result } );
        return this
    }
    convertCasingKeys(...args: any) {
        this.result = convertCasingKeys({ config: args[0], data: this.result } );
        return this
    }
    groupBy(...args: any) {
        this.result = groupBy({ config: args[0], data: this.result } );
        return this
    }
    addUSRegion(...args: any) {
        this.result = addUSRegion({ config: args[0], data: this.result } );
        return this
    }
}

export { Pipeline }