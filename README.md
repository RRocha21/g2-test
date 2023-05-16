# G2 Geolocation API

## Prerequisites
Make sure you have [node](https://nodejs.org/en/download/) installed, for consistency reasons we recommend using node v14.  
On top of that, install and make use of [yarn](https://yarnpkg.com/getting-started/install) as that's required for the mobile app itself.

## Installation
Install the required dependencies
```bash
yarn install
```

## Configuration
Create a new file called `.env`, we recommend copying `.env.default`.  
Fill in the required fields in `.env`.

The most important variables to get up and running are the JWT and database url.

## Setup Database
To setup the database, run the following command, this will create the tables and insert the data.
```bash
yarn migrate
```


### Start the API
```bash
yarn start
```

The API is now available at [localhost:5555](http://localhost:5555).  


## More Information
dump.sql contains the database dump.
sqlToJson.js contains the script to convert the dump to json.
migrateWithPsql.js contains the script to migrate the database with the dump.sql and with the command line psql...

