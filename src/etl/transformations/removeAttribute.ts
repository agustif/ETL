// removeAttribute.ts
export function removeAttribute<T>(options: RemoveAttributeConfig, data: any[]) {
  return (data: T[]): T[] => {
    if (!options || !options.attribute) {
      console.error('transformation removeAttribute requires an attribute argument!');
      return data;
    }

    if (options.attribute === RemoveOptions.Null) {
      return data.map((item: T) => {
        const removedNullAttributes = Object.entries(item).filter(([, val]) => val !== null);
        return Object.fromEntries(removedNullAttributes) as T;
      });
    } else if (options.attribute === RemoveOptions.Empty) {
      return data.map((item: T) => {
        const removedEmptyAttributes = Object.entries(item).filter(([, val]) => val !== '');
        return Object.fromEntries(removedEmptyAttributes) as T;
      });
    } else {
      console.error(`transformation removeAttribute: unknown attribute option '${options.attribute}'`);
      return data;
    }
  };
}

export enum RemoveOptions {
  Null = 'NULL',
  Empty = 'EMPTY',
}

export interface RemoveAttributeConfig {
  attribute?: RemoveOptions;
}