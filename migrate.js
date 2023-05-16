const Pool = require("pg").Pool;
require("dotenv").config();
const { countries, states, cities } = require('./fixtures');

const connectionString = process.env.DATABASE_URL;

const client = new Pool({
    connectionString,
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
});

async function populateTables() {
  try {
    await client.connect();

    // check if countries table exists
    const resCountries = await client.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'countries')");
    if (!resCountries.rows[0].exists) {
      await client.query("CREATE TABLE countries (name VARCHAR(255), iso VARCHAR(3), flag VARCHAR(255), phone VARCHAR(255), currency VARCHAR(255), population INTEGER)");
    } else {
      // delete contents of countries table
      await client.query("DELETE FROM countries");
    }

    // check if states table exists
    const resStates = await client.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'states')");
    if (!resStates.rows[0].exists) {
      await client.query("CREATE TABLE states (name VARCHAR(255), iso VARCHAR(3), state VARCHAR(255))");
    } else {
      // delete contents of states table
      await client.query("DELETE FROM states");
    }

    // check if cities table exists
    const resCities = await client.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'cities')");
    if (!resCities.rows[0].exists) {
      await client.query("CREATE TABLE cities (name VARCHAR(255), iso VARCHAR(3), state VARCHAR(255), population INTEGER)");
    } else {
      // delete contents of cities table
      await client.query("DELETE FROM cities");
    }

    // insert data into countries table
    for (const country of countries) {
      await client.query('INSERT INTO countries (name, iso, flag, phone, currency, population) VALUES ($1, $2, $3, $4, $5, $6)', [country.name, country.iso, country.flag, country.phone, country.currency, country.population]);
    }

    // insert data into states table
    for (const state of states) {
      await client.query('INSERT INTO states (name, iso, state) VALUES ($1, $2, $3)', [state.name, state.iso, state.state]);
    }

    // insert data into cities table
    for (const city of cities) {
      await client.query('INSERT INTO cities (name, iso, state, population) VALUES ($1, $2, $3, $4)', [city.name, city.iso, city.state, city.population]);
    }

    console.log('Data imported successfully');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

populateTables();

process.exit(0);