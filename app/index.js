const { Router } = require("express");
const controller = require("./controller");
const checkAuth = require("./middleware");
const router = Router();

router.get(
    "/api/v1/countries", 
    checkAuth, 
    controller.getCountries
);

router.get(
    "/api/v1/countries/:country", 
    checkAuth, 
    controller.getCountry
);

router.get(
    "/api/v1/countries/:country/states",
    checkAuth,
    controller.getStates
);

router.get(
    "/api/v1/countries/:country/states/:state", 
    checkAuth, 
    controller.getState
);

router.get(
    "/api/v1/countries/:country/states/:state/cities",
    checkAuth,
    controller.getCities
);


module.exports = router;
