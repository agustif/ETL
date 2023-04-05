type AnyObject = Record<string, any>;



const toCamel = (s: string): string => {
  return s.replace(/[_-]([a-zA-Z0-9])|([A-Z])/g, (match, lowerLetter, upperLetter, offset) => {
    if (lowerLetter) {
      return lowerLetter.toUpperCase();
    } else {
      return offset === 0 ? match.toLowerCase() : match;
    }
  });
};

const toPascal = (s: string): string => {
  return s.replace(/_([a-z])|^[a-z]/g, (match, letter) => {
    return (letter || match).toUpperCase();
  });
};

const toSnake = (s: string): string => {
  return s.replace(/[A-Z](?=[A-Z])|[A-Z]/g, (match, offset) => {
    return (offset > 0 ? '_' : '') + match.toLowerCase();
  });
};


const toUpperSnake = (s: string): string => {
  return toSnake(s).toUpperCase();
};

const toKebab = (s: string): string => {
  return toSnake(s).replace(/_/g, '-');
};

const toHungarianCamel = (s: string): string => {
  // Assumes s is in snake_case
  const [prefix, ...rest] = s.split('_');
  return prefix + rest.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('');
};

const toHungarianPascal = (s: string): string => {
  // Assumes s is in snake_case
  const [prefix, ...rest] = s.split('_');
  return prefix.charAt(0).toUpperCase() + prefix.slice(1) + rest.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
};


export const convertCasingToOptions = {
  Camel: 'camel',
  Pascal: 'pascal',
  Snake: 'snake',
  UpperSnake: 'upperSnake',
  Kebab: 'kebab',
  HungarianCamel: 'hungarianCamel',
  HungarianPascal: 'hungarianPascal',
};

export const convertCasingFromOptions = {
  Camel: 'camel',
  Pascal: 'pascal',
  Snake: 'snake',
  UpperSnake: 'upperSnake',
  Kebab: 'kebab',
  HungarianCamel: 'hungarianCamel',
  HungarianPascal: 'hungarianPascal',
};

function createConversionTableEntry(
  fromConverter: (key: string) => string,
  toHungarianCamelConverter?: (key: string) => string,
): Record<string, (key: string) => string> {  return {
    [convertCasingToOptions.Camel]: toCamel,
    [convertCasingToOptions.Pascal]: fromConverter === toPascal ? (key) => key : toPascal,
    [convertCasingToOptions.Snake]: fromConverter === toSnake ? (key) => key : toSnake,
    [convertCasingToOptions.UpperSnake]: fromConverter === toUpperSnake ? (key) => key : toUpperSnake,
    [convertCasingToOptions.Kebab]: fromConverter === toKebab || fromConverter === toSnake ? toKebab : (key) => key,
      [convertCasingToOptions.HungarianCamel]: toHungarianCamelConverter || fromConverter === toHungarianCamel ? (key) => key : toHungarianCamel,
    [convertCasingToOptions.HungarianPascal]: fromConverter === toHungarianPascal ? (key) => key : toHungarianPascal,
  };
}

const conversionFunctions: Record<string, Record<string, (key: string) => string>> = {
  [convertCasingFromOptions.Camel]: createConversionTableEntry(toCamel),
  [convertCasingFromOptions.Pascal]: createConversionTableEntry(toPascal),
  [convertCasingFromOptions.Snake]: createConversionTableEntry(toSnake),
  [convertCasingFromOptions.UpperSnake]: createConversionTableEntry(toUpperSnake),
  [convertCasingFromOptions.Kebab]: createConversionTableEntry(toKebab),
  [convertCasingFromOptions.HungarianCamel]: createConversionTableEntry(toHungarianCamel),
  [convertCasingFromOptions.HungarianPascal]: createConversionTableEntry(toHungarianPascal),
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


export function convertCasingKeys<T extends AnyObject>(options: ConvertCasingInput<T>): T[] {
  if (!options || !options.config || !options.data || !options.config.from || !options.config.to) {
    console.log('transformation convertCasingKeys requires options with config and data properties, and valid from and to values!');
    return [];
  }

  const {
    config: { from, to },
    data,
  } = options;

  const fromConversionFunctions = conversionFunctions[from];
  const conversionFunction = fromConversionFunctions && fromConversionFunctions[to];

  if (conversionFunction) {
    return data.map((item) => convertKeys(item, conversionFunction));
  } else {
    console.log(`transformation convertCasingKeys: unsupported conversion from '${from}' to '${to}'`);
    return data;
  }
}

export interface ConfigOptions {
  from: keyof typeof convertCasingFromOptions;
  to: keyof typeof convertCasingToOptions;
}

export interface ConvertCasingInput<T extends AnyObject> {
  config: ConfigOptions;
  data: T[];
}