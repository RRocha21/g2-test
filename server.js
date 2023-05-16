const express = require("express");
const countriesRouter = require("./app/index");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

app.use("/", countriesRouter);

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
