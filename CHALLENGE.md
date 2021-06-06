Coding challenge requirements:

Tech Stack to use: Node + Express + TypeScript + Passport + Jest

Data source: https://api.openbrewerydb.org/breweries

Challenge requirements: Using the above tech stack, write a REST API with a single /breweries endpoint that returns a list of breweries in the United States. The /breweries endpoint of your API should be tested with Jest and secured using Passport. In addition to fetching this data directly from the data source above, this endpoint should function as an ETL data pipeline where you process the data in the following ways:

- [] Step 1: Remove any attributes that are null from the data
* Step 2) Convert the keys of the objects in the response from snake case to camel case (e.g. “postal_code” -> “postalCode”)
* Step 3) Group the breweries together by state and then sort them by created_at so the most recent ones come first.
* Step 4) Add an attribute to each brewery called region that adds the correct region to each brewery based on this map: https://www.worldatlas.com/articles/the-regions-of-the-united-states.html (hint - take a look at the GPS coordinates for the United States and then use the longitude & latitude attributes for each brewery to compute this). If the brewery does not have a longitude & latitude then filter it out.

Note that each step above should be considered a separate step in the ETL pipeline and must run independently. This system should be modular and allow for future developers to easily add additional steps for processing. Please test to make sure that the data is fetchable via your /breweries endpoint and include instructions for how to do this in a README.md as part of the documentation.

Please don’t use lodash/underscore/rambda or any other helper libraries - we want to see your vanilla TypeScript abilities. 

Bonus: Give thought to how you can make this system both modular and extendable in order to allow future developers to add steps to the ETL pipeline so the data can be processed in different ways.
