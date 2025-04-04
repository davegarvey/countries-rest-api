## Country REST API

This is a simple RESTful API that serves country data. The API allows users to retrieve information about countries based on various criteria like country code, name, region, subregion, population range, and language. The country data is stored in a JSON file, which is loaded into the API on startup.

### HTTP Endpoints

- `/`: A simple endpoint to check if the API is running.
- `/all`: Retrieves all country data.
- `/cca2/:code`: Retrieves a country by its 2-letter country code (ISO 3166-1 alpha-2).
- `/name/:name`: Retrieves countries matching a name (or part of it).
- `/region/:region`: Retrieves countries within a specific region.
- `/subregion/:subregion`: Retrieves countries within a specific subregion.
- `/population/:min/:max`: Retrieves countries within a given population range.
- `/language/:language`: Retrieves countries where a specified language is spoken.

### Data Source

This API serves static data from a JSON file (`/data/countries.json`).