import { addUSRegionFromLatLong } from './addUSRegionFromLatLong';
describe('addUSRegionFromLatLong', () => {
    it('should return the correct US region for given latitude and longitude', () => {
    const testData = [
        { lat: 37.7749, long: -122.4194, region: 'West Region' },
        { lat: 40.7128, long: -74.0060, region: 'Northeast Region' },
        { lat: 41.8781, long: -87.6298, region: 'Midwest Region' },
        { lat: 33.4484, long: -112.0740, region: 'Southwest Region' },
        { lat: 33.748995, long: -84.387982, region: 'Southeast Region' },
        { lat: 47.7511, long: -120.7401, region: 'West Region' }, // Washington State
        // { lat: 18.2208, long: -66.5901, region: 'Southeast Region' }, // Puerto Rico
        ];
      testData.forEach(({ lat, long, region }) => {
        expect(addUSRegionFromLatLong(lat, long)).toBe(region);
      });
    });
  
    it('should return null for a latitude and longitude not in any US region', () => {
      const testData = [
        { lat: -33.8688, long: 151.2093 }, // Sydney, Australia
        { lat: 51.5074, long: -0.1278 }, // London, UK
        { lat: 35.6895, long: 139.6917 }, // Tokyo, Japan
        { lat: 90, long: 0 }, // North Pole
        { lat: -90, long: 0 }, // South Pole
      ];
  
      testData.forEach(({ lat, long }) => {
        expect(addUSRegionFromLatLong(lat, long)).toBeNull();
      });
    });
  
    it('should throw an error for an invalid latitude or longitude', () => {
      const testData = [
        { lat: 'invalid_lat', long: 'invalid_long' },
        { lat: -200, long: 100 },
        { lat: 200, long: 100 },
        { lat: 100, long: -200 },
        { lat: 100, long: 200 },
        { lat: NaN, long: 100 },
        { lat: 100, long: NaN },
        { lat: Infinity, long: 100 },
        { lat: 100, long: -Infinity },
      ];
  
      testData.forEach(({ lat, long }) => {
        expect(() => addUSRegionFromLatLong(lat as any, long as any)).toThrow(TypeError);
      });
    });


  it('should return the correct US region for given latitude and longitude at region boundaries', () => {
    const testData = [
      { lat: 36.5007, long: -79.2688, region: 'Southeast Region' }, // Boundary between Southeast and Northeast
      { lat: 36.5007, long: -89.5334, region: 'Midwest Region' }, // Boundary between Southeast and Midwest
      { lat: 36.5007, long: -102.0518, region: 'Southwest Region' }, // Boundary between Southwest and Midwest
      { lat: 46.8721, long: -102.0518, region: 'Midwest Region' }, // Boundary between West and Midwest
    ];

    testData.forEach(({ lat, long, region }) => {
      expect(addUSRegionFromLatLong(lat, long)).toBe(region);
    });
  });

    // it('should return the correct US region for given latitude and longitude near region boundaries', () => {
    // const testData = [
    //   { lat: 36.6007, long: -79.2688, region: 'Northeast Region' },
    //   { lat: 36.4007, long: -79.2688, region: 'Southeast Region' },
    //   { lat: 36.6007, long: -89.5334, region: 'Midwest Region' },
    //   { lat: 36.4007, long: -89.5334, region: 'Southeast Region' },
    //   { lat: 36.6007, long: -102.0518, region: 'Midwest Region' },
    //   { lat: 36.4007, long: -102.0518, region: 'Southwest Region' },
    //   { lat: 46.9721, long: -102.0518, region: 'Midwest Region' },
    //   { lat: 46.7721, long: -102.0518, region: 'West Region' },
    // ];

    // testData.forEach(({ lat, long, region }) => {
    //   expect(addUSRegionFromLatLong(lat, long)).toBe(region);
    // });
    // });


  });
