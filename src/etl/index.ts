import restExtractor,{ RestExtractorOptions, Format } from 'etl/extractors/rest'

class Pipeline {
    result: object;
    constructor() {
        this.result = {};
      }
      get finish() {
        return this.result;
      }
    restExtractor = (...args: RestExtractorOptions[]) =>  restExtractor(args[0]);
    //   sum(...args: any[]) {
    //     this.result = args.reduce((sum, current) => sum + current, 0);
    //     return this;
    //   }
    //   add(result: number) {
    //     this.result += result;
    //     return this;
    //   }
    //   subtract(result: number) {
    //     this.result -= result;
    //     return this;
    //   }
    //   average(...args: any[]) {
    //     this.result = args.length
    //       ? (this.sum(...args).result) / args.length
    //       : undefined;
    //     return this;
    //   }
}

export { Pipeline }