// import USRegions from './etl/transformations/addUSRegion/data/us_region.json'
// import * as USRegions from "etl/transformations/addUSRegion/data/us_region.json";
//https://www.google.com/maps/d/viewer?msa=0&mid=1ilXzshwFvT_IcBO_z9roX9WPkbU&ll=38.19501869558147%2C-95.89691189999999&z=4
// regionNames = Array(5) ["West", "Southeast", "Southwest", "Northeast", "Midwest"]
// We could also guess regions by State/Address when lat/long is missng. not implemented.
// const USRegions = require("./data/us_regions.json");
import { FeatureCollection, Polygon } from 'geojson';
import * as USRegions from './data/us_regions.json';

type USRegion = FeatureCollection<Polygon>;

const isValidCoordinate = (coordinate: number): boolean => {
  return !isNaN(coordinate) && coordinate >= -180 && coordinate <= 180;
};

const addUSRegionFromLatLong = (lat: number, long: number): string | null => {
  if (!isValidCoordinate(lat) || !isValidCoordinate(long)) {
    throw new TypeError('Invalid latitude or longitude. Numbers between -180 and 180 are expected');
  }

  const regions = (USRegions as USRegion).features.filter((region) =>
    isPointInPolygon(long, lat, region.geometry.coordinates[0])
  );

  return regions.length > 0 ? regions[0].properties.Name : null;
};

export { addUSRegionFromLatLong };

function isPointInPolygon(latitude: number, longitude: number, polygon: number[][]): boolean {
  if (!Array.isArray(polygon) || polygon.length === 0) {
    throw new TypeError('Invalid polygon. Non-empty Array expected');
  }

  const x = latitude;
  const y = longitude;

  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];

    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
}