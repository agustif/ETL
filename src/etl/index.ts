import restExtractor, { RestExtractorOptions } from 'etl/extractors/rest'
import removeAttribute from 'etl/transformations/removeAttribute'
import convertCasingKeys from 'etl/transformations/convertCasingKeys'

class Pipeline {
    result: object[];
    constructor() {
        this.result = [{}]
      }
      get finish() {
        return this.result;
      }
    async restExtractor(...args: RestExtractorOptions[]) {
        this.result =  await restExtractor(args[0]);
        return this
    }
    removeAttribute(...args: any) {
        this.result = removeAttribute({ attribute: args[0], data: this.result } );
        return this
    }
    convertCasingKeys(...args: any) {
        this.result = convertCasingKeys({ config: args[0], data: this.result } );
        return this
    }
}

export { Pipeline }