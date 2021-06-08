import { Brewery } from 'etl/types/brewery'
import { addUSRegionFromLatLong } from 'etl/transformations/addUSRegion/addUSRegionFromLatLong'

export default function addUSRegion(options: AddUSRegionOptions): any {
  const { config } = options
  const { input, ifEmptyOrNullLatLong } = config
  const { lat, long } = input
  let { data } = options
  if (ifEmptyOrNullLatLong === ifEmptyOrNullOptions.Remove) {
    data = data.filter((b: Brewery) => Object.keys(b).includes(lat) && Object.keys(b).includes(long))
  }
  if (input && data) {
    data.map((brewery: Brewery) => {
      const { latitude, longitude } = brewery
      brewery.USRegion = addUSRegionFromLatLong(Number(latitude), Number(longitude))
    })
  } else if (!input) {
    console.error('transformation addUSRegion requires an input with lat long config argument!')
  } else if (!data) {
    console.error('transformation addUSRegion requires an extractor to be used first')
  }
  return data
}
export interface AddUSRegionInputOptions {
  lat: string
  long: string
}

export enum ifEmptyOrNullOptions {
  Remove = 'remove',
  Keep = 'keep'
}
export interface AddUSRegionConfig {
  input: AddUSRegionInputOptions
  ifEmptyOrNullLatLong?: ifEmptyOrNullOptions
}

export interface AddUSRegionOptions {
  config: AddUSRegionConfig
  data: Brewery[]
}
