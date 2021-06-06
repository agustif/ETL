# ETL - Pipelines > Extractors, Transformations, and Loaders.
A simple but powerful ETL framework to help build modular and extendatble Pipelines.



An extendable and modular ETL system, composed of Pipelines, which are either **extractors**, **transformations**, or **loaders**.

You can choose any combination of them to build your pipelines

An example breweries pipeline is implemented to match the requirements of the coding challenge.

Project sturcture

src/app.ts                      // Contains our express app which responds to the **/berweries** endpoint with running our **BreweriesPipeline**.
src/etl                         // Folder containing all the ETL business logic.
src/etl/index.ts                // Pipeline Class lives here, need to add any new extractors/transformations/loaders to it.
src/etl/pipelines/breweries.ts  // Implementation of our breweries pipeline.
src/etl/extractors/rest.ts // A rest endpoint extractor, handles JSON input/output only for now


Class **Pipeline** contains both pipeline result, any available ETL operations, and also a pipelineResult to call when finishing up our Pipeline.
Any Pipeline must at least have **one Exctractor component** in order to produce any data to later process with transformations and finally store with loaders. 

Have in mind for now **only 1 [one] extractor** can be used at the start of your pipeline, not multiple ones.
But you could always build a wrapper mainExtractor that calls two subExtractors with the data you need, so you would call the mainExtractor first thing in your pipeline, and then after chaining all the transformations you want, you can either use one or several  loaders to export your data into any stores, databases, endpoints, etc,

**Extractors**
Do you need other extractors?
You could build some to read files from either an API endpoint or FileSystem, and parse them accordinlgy as CSV, plaintext, or whatever suits your needs.
You could also build a WebSocket extractor endpoint if you're getting fancy with real-time data.

**Loaders**
No real loaders where implemented, in our case, you could save the JSON as a file to the FS, or insert into a local or external database, or do N things with your pipeline data.

You can also finish your pipeline by calling **YourPipeline.pipelineResult** and get the pipelines data as a JSON object.

Which is what we do, and then serve that JSON as our API response in our case.


For running the project
`yarn or npm start`

For running tests
`yarn or npm test`


Visit http://localhost:3000/breweries

