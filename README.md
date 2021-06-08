# ETL - Extract, Transform, Load

#### Build your pipelines using extractors, transformations, and loaders.

### Stack

This project is built with **NodeJS**, **TypeScript**, **Express**, **Passport**, **Jest** (and **Supertest**).

---

### App

We have implemented an example express app, with a **/breweries** endpoint that is protected by auth **BreweriesPipeline** that uses different extractors and transformations and finally serves the resulting JSON data in our /breweries endpoint.

In order to run this project, you need to have **node** installed, and you can use either `npm` or `yarn`:

**install dependencies:**

`yarn install`

Build the app (Optional)

`yarn build`

**run the app**

`yarn start`

**run test suite**

`yarn test`

**open in your browser** http://localhost:3000/breweries

You will get an `401 Unauthorized` error message.

**Get a freshly minted and valid token at:** http://localhost:3000/token

Use **your new token** adding it to the GET request to http://localhost:3000/breweries as **an Authorization Header.**

Use the format:

`'Authorization: Bearer <your_token_here>'`

#### Get Breweries Pipeline with Authorization:

**example using curl:**

`curl "http://localhost:3000/breweries" \
 -H 'Authorization: Bearer <your_token_here>'`

**Envirorment variables (Optional)**

You can set them, but it's not required, can

---

## ETL: the **micro-framework**

We've built our ETL code inside the **src/etl** folder,

**etl/index.ts** file contains our main class:

## Pipeline

A pipeline is composed of mainly 3 kinds of differrent components

1. **Extractors**: First thing we chain into our new Pipeline, it extracts data from somewhere, and makes it available as this.result to all the rest of the chained transformations and loaders.
  
2. **Transformations**: Transformations can do anything with our current data, either filter or change it's format, or extend it with more data based from current data.
  
3. **Loaders**:
  

####

#### Extractors - extract data and load onto your pipeline.

1. Must be first chained function call after new Pipeline is created.
  
2. can be combined into
  

A simple but powerful ETL framework to help build modular and extendatble Pipelines.

An extendable and modular ETL system, composed of Pipelines, which are either **extractors**, **transformations**, or **loaders**.

You can choose any combination of them to build your pipelines

An example breweries pipeline is implemented to match the requirements of the coding challenge.

#### Project sturcture

```
├── __tests__
│   └── breweries.test.ts
├── app.ts                // Contains our express app which responds to /berweries
├── etl
│   ├── index.ts          // Pipeline Class lives here, need to add any new extractors/transformations/loaders to it.
│   ├── extractors
│   │   └── rest.ts       // A rest endpoint extractor, handles JSON input/output only for now
│   ├── loaders
│   ├── pipelines
│   │   └── breweries.ts  // Implementation of our breweries pipeline.
│   ├── transformations
│   │   ├── addUSRegion                     // addUSRegion transformation, adds Region from lat/long data, filters breweries if !lat,long
│   │   │   ├── addUSRegionFromLatLong.ts   // function that finds if a [lat, long] point is inside a US Region polygon.
│   │   │   ├── data
│   │   │   │   └── us_regions.json         // GeoJSON data of USRegions, doesn't include non-continental US
│   │   │   └── index.ts                    // addUSRegion() transformation implementation, calls addUSRegionFromLatLong()
│   │   ├── convertCasingKeys.ts            // convertCasingKeys() transformation, converts casing in object's keys from snake or kebab to camel case
│   │   ├── groupBy.ts                      // groupBy() transformation, groups records by attribute, order's before grouping too.
│   │   └── removeAttribute.ts              // removeAttribute(), removes any attribute matched, in this case used for when values contain NULL.
│   └── types
│       └── brewery.ts                      // Our brewery type, used to ensure data consistency and for better DX
└── middleware
    └── auth.ts                             // passport and passport-jwt authentication middleware
```

##### Pipeline

Class **Pipeline** contains both pipeline result, any available ETL operations, and also a pipelineResult to call when finishing up our Pipeline.

Any Pipeline must at least have **one Exctractor component** in order to produce any data to later process with transformations and finally store with loaders.

Have in mind for now **only 1 [one] extractor** can be used at the start of your pipeline, not multiple ones.

But you could always build a wrapper mainExtractor that calls two subExtractors with the data you need, so you would call the mainExtractor first thing in your pipeline, and then after chaining all the transformations you want, you can either use one or several loaders to export your data into any stores, databases, endpoints, etc,


**Extractors**

Do you need other extractors?

You could build some to read files from either an API endpoint or FileSystem, and parse them accordinlgy as CSV, plaintext, or whatever suits your needs.

You could also build a WebSocket extractor endpoint if you're getting fancy with real-time data.

**Transformations**
You can use several transformations after your extractor,
they can modify and shape the data as you please,
but you always need to return this and add your modifications to the results,
so it's available to the next transformation if available,
or to the finished call to show the final results.

**Loaders**

No real loaders where implemented, in our case, you could save the JSON as a file to the FS, or insert into a local or external database, or do N things with your pipeline data.

You can also finish your pipeline by calling **YourPipeline.pipelineResult** and get the pipelines data as a JSON object.

Which is what we do, and then serve that JSON as our API response in our case.


### Extending it to suit your needs.
If you want to add a new extractor/transformation/loader,
create either a file or folder containing all
 your related code in one of the available subfolders.
Wire it to main Pipeline class so it's available for your new pipeline,
and create a new pipeline in pipelines folder,
you can take a look at the breweries one as an example.

You could also extract some logic from current transformations,
 or expand them to suit your needs.

### Next steps
 In the future we might separate things into npm-packages so it's easier to make code more modular.