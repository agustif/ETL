import restExtractor, { RestExtractorOptions } from './extractors/rest/restExtractor'
import removeAttribute from './transformations/removeAttribute'
import {convertCasingKeys} from './transformations/convertCasing/convertCasingKeys'
import groupBy from './transformations/groupBy'
import addUSRegion from './transformations/addUSRegion'

class Pipeline<T> {
  private result: T[];

  static create<T>(): Pipeline<T> {
    return new Pipeline<T>();
  }

  get finished(): Promise<Brewery[]> {
    return Promise.resolve(this.result);
  }

}

export { Pipeline };
