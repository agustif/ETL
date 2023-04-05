# How to

- Create fetchYourFetcher.ts under etl/fetchers/ folder
- Add it to restExtractor
- Add your case Format.YourFormat to the switch sattement under fetchData()
- Add to enum Format.
- Modify RestExtractorOptions interface if required. (optional)
- Add tests in restExtractor.test.ts. Dont forget edge cases.
