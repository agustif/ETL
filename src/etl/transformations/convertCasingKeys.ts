import { Brewery } from 'etl/types/brewery'

const toCamel = (s: string): string => {
  return s.replace(/([-_][a-z])/gi, ($1: string) => {
    return $1
      .toUpperCase()
      .replace('-', '') // for kebab-case
      .replace('_', '') // for snake_case
  })
}

export default function convertCasingKeys(options: ConvertCasingInput): Brewery[] {
  const { config, data } = options
  const { from, to } = config
  if (from === 'snake' || ('kebab' && to === 'camel')) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data?.map((brewery: Brewery | any) =>
      Object.keys(brewery).reduce((accumulator: Brewery[] | any, currentValue) => {
        accumulator[toCamel(currentValue)] = brewery[currentValue]
        return accumulator
      }, {})
    )
  } else if (to !== 'camel') {
    console.error('Only conversion from kebab or snake to camel case implemented.')
  } else if (!config) {
    console.error(
      'transformation convertCasingKeys requires an config argument with both a `from`:(snake|kebab) and `to`:(camel) options!'
    )
  } else if (!data) {
    console.error('transformation convertCasingKeys requires an extractor to be used first')
  }
  return data
}
export enum convertCasingToOptions {
  Camel = 'camel'
}
export enum convertCasingFromOptions {
  Snake = 'snake',
  Kebab = 'kebab'
}
export interface ConfigOptions {
  from: convertCasingFromOptions
  to: convertCasingToOptions
}
export interface ConvertCasingInput {
  config: ConfigOptions
  data: Brewery[]
}
