const getCountries = "select * from countries";
const getCountryByName = "select * from countries where LOWER(name) = LOWER($1)";
const getCountryByIso = "select * from countries where LOWER(iso) = LOWER($1)";
const getStates = "select * from states where LOWER(iso) = LOWER($1)";
const getStateByName = "select * from states where LOWER(name) = LOWER($1) and LOWER(iso) = LOWER($2)";
const getStateByIso = "select * from states where LOWER(state) = LOWER($1) and LOWER(iso) = LOWER($2)";
const getCities = "select * from cities where LOWER(state) = LOWER($1) and LOWER(iso) = LOWER($2)";


module.exports = {
    getCountries,
    getCountryByName,
    getCountryByIso,
    getStates,
    getStateByName,
    getCities,
    getStateByIso,
};
