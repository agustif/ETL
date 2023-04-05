import {removeAttribute, RemoveOptions } from '../transformations/removeAttribute';
import { convertCasingKeys, convertCasingFromOptions, convertCasingToOptions } from '../transformations/convertCasing/convertCasingKeys';
import restExtractor, { Format } from '../extractors/rest/restExtractor';
import { Pipeline } from '../index';
import { addUSRegion, ifEmptyOrNullOptions } from '../transformations/addUSRegion';
import groupBy, { GroupOptions, OrderByOptions, OrderOptions } from '../transformations/groupBy';

export async function BreweriesPipeline(): Promise<Brewery[]> {
  const restEndpoint = 'https://api.openbrewerydb.org/breweries';

  const initialPipeline = Pipeline.create<Brewery>();

  const BreweriesPipeline = await initialPipeline
    |> restExtractor({
      endpoint: restEndpoint,
      format: Format.Json,
    }, %)
    |> removeAttribute({ attribute: RemoveOptions.Null }, %)
    |> convertCasingKeys({ from: convertCasingFromOptions.Snake, to: convertCasingToOptions.Camel }, %)
    // FIXME: |> addUSRegion({ input: { lat: 'latitude', long: 'longitude' }, ifEmptyOrNullLatLong: ifEmptyOrNullOptions.Remove }, %)
    |> groupBy(GroupOptions.State, OrderByOptions.CreatedAt, OrderOptions.Ascendent, %)

    return await BreweriesPipeline.finished;
}

export interface Brewery {
  id: number
  obdbId: string
  name: string
  breweryType: string // enum candidate
  street: string
  city: string
  state: string
  countyProvince: string
  postalCode: number
  longitude: number
  latitude: number
  phone: string
  websiteUrl: string
  updatedAt: Date
  createdAt: Date
  USRegion: string
}
