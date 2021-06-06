import { Brewery } from 'etl/types/brewery'

const toCamel = (s: string): string => {
    return s.replace(/([-_][a-z])/ig, ($1: string) => {
        return $1.toUpperCase()
            .replace('-', '') // for kebab-case
            .replace('_', ''); // for snake_case
    });
};

export default function convertCasingKeys(options: ConvertCasingInput): any {
    const { config , data } = options
    console.log('config;', config)
    const { from, to } = config;

    console.log(from, to)
    if (config.from === "snake" || "kebab" && config.to === 'camel') {
        return data.map((brewery:  any) =>
            Object.keys(brewery).reduce((accumulator: any, currentValue) => {
                accumulator[toCamel(currentValue)] = brewery[currentValue];
                return accumulator;
            }, {})
        );
    } else if (config.to !== "camel") {
        console.error("Only conversion from kebab or snake to camel case implemented.")
    }
    else if (!config) {
        console.error('transformation convertCasingKeys requires an config argument with both a `from`:(snake|kebab) and `to`:(camel) options!')
    }
    else if (!data) {
        console.error('transformation convertCasingKeys requires an extractor to be used first')
    }
    else {
        return data
    }
}
enum convertCasingToOptions {
    Camel = "camel"
}
enum convertCasingFromOptions {
    Snake = "snake",
    Kebab = "kebab"

}
export interface ConfigOptions{
    from: convertCasingFromOptions
    to: convertCasingToOptions
}
export interface ConvertCasingInput  {
    config: ConfigOptions
    data: Brewery[] | any
}
