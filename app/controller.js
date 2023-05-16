const pool = require("../db");
const queries = require("./queries");

const getCountries = async (req, res) => {
    try {
        const results = await pool.query(queries.getCountries);
        res.status(200).json(results.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getCountry = async (req, res) => {
    try {
        if (req.params.country.length > 2) {

            const results = await pool.query(queries.getCountryByName, [
                req.params.country,
            ]);
            res.status(200).json(results.rows);
        } else {
            const results = await pool.query(queries.getCountryByIso, [req.params.country]);
            res.status(200).json(results.rows);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getStates = async (req, res) => {
    try {
        if (req.params.country.length > 2) {

            const countryName = await pool.query(queries.getCountryByName, [
                req.params.country,
            ]);
            /* get the iso from the country name */
            /* this is done because one of the fields in the states table is the country iso */
            let countryIso = countryName.rows[0].iso;       

            /* get the states from the iso */
            const results = await pool.query(queries.getStates, [countryIso]);
            res.status(200).json(results.rows);
        } else {
            let countryIso = req.params.country.toUpperCase();
            const results = await pool.query(queries.getStates, [countryIso]);
            res.status(200).json(results.rows);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getState = async (req, res) => {
    try {
        let countryIso = req.params.country.toUpperCase();

        if (req.params.country.length > 2) {

            const countryName = await pool.query(queries.getCountryByName, [
                req.params.country,
            ]);
            /* get the iso from the country name */
            /* this is done because one of the fields in the states table is the country iso */
            countryIso = countryName.rows[0].iso; 
        }

        let stateIso = req.params.state.toUpperCase();
        const results = await pool.query(queries.getStateByIso, [stateIso, countryIso]);

        /* once the state iso can have a different number of characters */
        /* one way to check if the valued received is an ISO or a name */
        /* is to first try to search assuming it was an ISO */
        /* if the result is empty, then it is a name */

        if (results.rows.length !== 0) {
            res.status(200).json(results.rows);
        } else {

            const results = await pool.query(queries.getStateByName, [
                req.params.state,
                countryIso,
            ]);

            res.status(200).json(results.rows);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getCities = async (req, res) => {
    try {
        let countryIso = req.params.country.toUpperCase();

        if (req.params.country.length > 2) {

            const countryName = await pool.query(queries.getCountryByName, [
                req.params.country,
            ]);
            /* get the iso from the country name */
            /* this is done because one of the fields in the states table is the country iso */
            countryIso = countryName.rows[0].iso; 
        }

        let stateIso = req.params.state.toUpperCase();
        const results = await pool.query(queries.getCities, [stateIso, countryIso]);

        /* once the state iso can have a different number of characters */
        /* one way to check if the valued received is an ISO or a name */
        /* is to first try to search assuming it was an ISO */
        /* if the result is empty, then it is a name */

        if (results.rows.length !== 0) {
            res.status(200).json(results.rows);
        } else {

            const stateName = await pool.query(queries.getStateByName, [
                req.params.state,
                countryIso,
            ]);

            if (stateName.rows.length !== 0) {
                /* prevent an error if the state name is not found */
                /* this way it will return an empty array */
                stateIso =
                    stateName.rows[0]
                        .state; 
            }
            const results = await pool.query(queries.getCities, [stateIso, countryIso]);
            res.status(200).json(results.rows);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};


module.exports = {
    getCountries,
    getCountry,
    getStates,
    getCities,
    getState,
};
