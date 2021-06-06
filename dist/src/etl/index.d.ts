import { RestExtractorOptions } from 'etl/extractors/rest';
declare class Pipeline {
    result: object;
    constructor();
    get finish(): object;
    restExtractor: (...args: RestExtractorOptions[]) => void;
}
export { Pipeline };
