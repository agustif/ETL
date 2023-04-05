export const toCamel = (s: string): string => {
    return s.replace(/[_-]([a-zA-Z0-9])|([A-Z])/g, (match, lowerLetter, upperLetter, offset) => {
      if (lowerLetter) {
        return lowerLetter.toUpperCase();
      } else {
        return offset === 0 ? match.toLowerCase() : match;
      }
    });
  };
  
  export const toPascal = (s: string): string => {
    return s.replace(/_([a-z])|^[a-z]/g, (match, letter) => {
      return (letter || match).toUpperCase();
    });
  };
  
  export const toSnake = (s: string): string => {
    return s.replace(/[A-Z](?=[A-Z])|[A-Z]/g, (match, offset) => {
      return (offset > 0 ? '_' : '') + match.toLowerCase();
    });
  };
  
  export const toUpperSnake = (s: string): string => {
    return toSnake(s).toUpperCase();
  };
  
  export const toKebab = (s: string): string => {
    return toSnake(s).replace(/_/g, '-');
  };
  
  export const toHungarianCamel = (s: string): string => {
    // Assumes s is in snake_case
    const [prefix, ...rest] = s.split('_');
    return prefix + rest.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  };
  
  export const toHungarianPascal = (s: string): string => {
    // Assumes s is in snake_case
    const [prefix, ...rest] = s.split('_');
    return prefix.charAt(0).toUpperCase() + prefix.slice(1) + rest.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  };
  
  export const conversionFunctions = {
    Camel: {
      Camel: (key: string) => key,
      Pascal: toPascal,
      Snake: toSnake,
      UpperSnake: toUpperSnake,
      Kebab: toKebab,
      HungarianCamel: toHungarianCamel,
      HungarianPascal: toHungarianPascal,
    },
    Pascal: {
      Camel: toCamel,
      Pascal: (key: string) => key,
      Snake: (s: string): string => {
        return toSnake(s).toLowerCase();
      },
      UpperSnake: (s: string): string => {
        return toUpperSnake(s).toLowerCase();
      },
      Kebab: (s: string): string => {
        return toKebab(s).toLowerCase();
      },
      HungarianCamel: (s: string): string => {
        return toHungarianCamel(toSnake(s));
      },
      HungarianPascal: (s: string): string => {
        return toHungarianPascal(toSnake(s));
      },
    },
    Snake: {
      Camel: toCamel,
      Pascal: toPascal,
      Snake: (key: string) => key,
      UpperSnake: toUpperSnake,
      Kebab: toKebab,
      HungarianCamel: toHungarianCamel,
      HungarianPascal: toHungarianPascal,
    },
    UpperSnake: {
      Camel: toCamel,
      Pascal: toPascal,
      Snake: toSnake,
      UpperSnake: (key: string) => key,
      Kebab: (s: string): string => {
        return toKebab(s).toUpperCase();
      },
      HungarianCamel: (s: string): string => {
        return toHungarianCamel(toSnake(s));
      },
      HungarianPascal: (s: string): string => {
        return toHungarianPascal(toSnake(s));
      },
    },
    Kebab: {
      Camel: (s: string): string => {
        return toCamel(s.replace(/-/g, '_'));
      },
      Pascal: (s: string): string => {
        return toPascal(s.replace(/-/g, '_'));
      },
      Snake: (s: string): string => {
        return toSnake(s.replace(/-/g, '_'));
      },
      UpperSnake: (s: string): string => {
        return toUpperSnake(s.replace(/-/g, '_'));
      },
      Kebab: (key: string) => key,
      HungarianCamel: (s: string): string => {
        return toHungarianCamel(toSnake(s.replace(/-/g, '_')));
      },
      HungarianPascal: (s: string): string => {
        return toHungarianPascal(toSnake(s.replace(/-/g, '_')));
      },
    },
    HungarianCamel: {
      Camel: (s: string): string => {
        return toCamel(s.replace(/^[A-Z]/, (c: string) => c.toLowerCase()));
      },
      Pascal: (s: string): string => {
        return toHungarianPascal(toSnake(s)).replace(/^[a-z]/, (c: string) => c.toUpperCase());
      },
      Snake: (s: string): string => {
        return toHungarianPascal(toSnake(s));
      },
      UpperSnake: (s: string): string => {
        return toHungarianPascal(toUpperSnake(s));
      },
      Kebab: (s: string): string => {
        return toHungarianPascal(toKebab(s));
      },
      HungarianCamel: (key: string) => key,
      HungarianPascal: toHungarianPascal,
    },
    HungarianPascal: {
      Camel: (s: string): string => {
        return toHungarianCamel(toSnake(s)).replace(/^[a-z]/, (c: string) => c.toUpperCase());
      },
      Pascal: (s: string): string => {
        return toPascal(s.replace(/^[A-Z]/, (c: string) => c.toLowerCase()));
      },
      Snake: (s: string): string => {
        return toHungarianCamel(toSnake(s));
      },
      UpperSnake: (s: string): string => {
        return toHungarianCamel(toUpperSnake(s));
      },
      Kebab: (s: string): string => {
        return toHungarianCamel(toKebab(s));
      },
      HungarianCamel: toHungarianCamel,
      HungarianPascal: (key: string) => key,
    },
  };