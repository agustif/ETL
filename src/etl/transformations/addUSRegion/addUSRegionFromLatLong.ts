// import USRegions from 'etl/transformations/addUSRegion/data/us_region.json'
// import * as USRegions from "etl/transformations/addUSRegion/data/us_region.json";
//https://www.google.com/maps/d/viewer?msa=0&mid=1ilXzshwFvT_IcBO_z9roX9WPkbU&ll=38.19501869558147%2C-95.89691189999999&z=4
// regionNames = Array(5) ["West", "Southeast", "Southwest", "Northeast", "Midwest"]
// We could also guess regions by State/Address when lat/long is missng. not implemented.
// const USRegions = require("./data/us_regions.json");
import * as USRegions from './data/us_regions.json'

const addUSRegionFromLatLong = (lat: number, long: number): string => {
  const regions = USRegions.features.filter((region: any) =>
    isPointInPolygon(long, lat, region.geometry.coordinates[0])
  )
  return regions[0]!.properties.Name
}

export { addUSRegionFromLatLong }

function isPointInPolygon(latitude: any, longitude: any, polygon: any[][]) {
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    throw new TypeError('Invalid latitude or longitude. Numbers are expected')
  } else if (!polygon || !Array.isArray(polygon)) {
    throw new TypeError('Invalid polygon. Array with locations expected')
  } else if (polygon.length === 0) {
    throw new TypeError('Invalid polygon. Non-empty Array expected')
  }

  const x = latitude
  const y = longitude

  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i]![0]
    const yi = polygon[i]![1]
    const xj = polygon[j]![0]
    const yj = polygon[j]![1]

    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }

  return inside
}
