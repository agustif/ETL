import { Brewery } from 'etl/types/brewery'

export default function removeAttribute(options: RemoveAttributeOptions): Brewery[] {
  const { config, data } = options
  const { attribute } = config
  if (attribute === 'NULL') {
    return data.map((brewery: Brewery) => {
      const removedNullAttributes = Object.entries(brewery).filter(([, val]) => val !== null)
      return Object.fromEntries(removedNullAttributes) as Brewery
    })
  } else if (!attribute) {
    console.error('transformation removeAttribute requires an attribute argument!')
  } else if (!data) {
    console.error('transformation removeAttribute requires an extractor to be used first')
  }
  return data
}

export enum RemoveOptions {
  Null = 'NULL',
  Empty = 'EMPTY'
}
export interface RemoveAttributeConfig {
  attribute: RemoveOptions
}

export interface RemoveAttributeOptions {
  config: RemoveAttributeConfig
  data: Brewery[]
}
