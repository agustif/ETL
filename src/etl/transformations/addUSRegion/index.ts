import { addUSRegionFromLatLong } from './addUSRegionFromLatLong';

export function addUSRegion<T extends Record<string, any>>(options: AddUSRegionOptions<T>): T[] {
  const { config: { lat, long, ifEmptyOrNullLatLong }, data } = options;

  const filteredData = ifEmptyOrNullLatLong === ifEmptyOrNullOptions.Remove
    ? data.filter((item) => lat in item && long in item && item[lat] !== null && item[long] !== null)
    : data;

  if (!(lat in filteredData[0]) || !(long in filteredData[0])) {
    console.error('transformation addUSRegion requires an input with lat long config argument!');
    return data;
  }

  filteredData.forEach((item) => {
    const { [lat]: latitude, [long]: longitude, ...rest } = item;
    if (latitude !== null && longitude !== null) {
      item.USRegion = addUSRegionFromLatLong(Number(latitude), Number(longitude));
    }
    Object.assign(item, rest);
  });

  return filteredData;
}

export enum ifEmptyOrNullOptions {
  Remove = 'remove',
  Keep = 'keep',
}

export interface AddUSRegionConfig {
  lat: string;
  long: string;
  ifEmptyOrNullLatLong?: ifEmptyOrNullOptions;
}

export interface AddUSRegionOptions<T extends Record<string, any>> {
  config: AddUSRegionConfig;
  data: T[];
}