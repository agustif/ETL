import { AnyObject, conversionFunctions } from './casingUtils';

type AnyObject = Record<string, any>;

export const convertCasingValues = <T extends AnyObject>(options: ConvertCasingInput<T>): T => {
  if (!options || !options.config || !options.data || !options.config.from || !options.config.to) {
    console.log('transformation convertCasingValues requires options with config and data properties, and valid from and to values!');
    return options.data;
  }

  const {
    config: { from, to },
    data,
  } = options;

  const fromConversionFunctions = conversionFunctions[from];
  const conversionFunction = fromConversionFunctions && fromConversionFunctions[to];

  if (conversionFunction) {
    return convertKeys(data, conversionFunction);
  } else {
    console.log(`transformation convertCasingValues: unsupported conversion from '${from}' to '${to}'`);
    return data;
  }
};

function convertKeys<T extends AnyObject>(obj: T, converter: (key: string) => string): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  const processArrayItems = (arr: any[]): any[] => {
    return arr.map(item => {
      if (Array.isArray(item)) {
        return processArrayItems(item);
      } else if (typeof item === 'string') {
        return converter(item);
      } else {
        return item;
      }
    });
  };

  const result: AnyObject = Object.keys(obj).reduce((accumulator: AnyObject, currentValue) => {
    const value = obj[currentValue];
    let newValue;
    if (Array.isArray(value)) {
      newValue = processArrayItems(value);
    } else if (typeof value === 'object') {
      newValue = convertKeys(value, converter);
    } else {
      newValue = value;
    }
    accumulator[converter(currentValue)] = newValue;
    return accumulator;
  }, {});

  return result as T;
}

export interface ConfigOptions {
  from: keyof typeof conversionFunctions;
  to: keyof typeof conversionFunctions;
}

export interface ConvertCasingInput<T extends AnyObject> {
  config: ConfigOptions;
  data: T;
}
