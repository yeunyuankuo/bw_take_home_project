const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

/**
 * General Setup
 */

// Create express application
var app = express();

// Configure mySQL connection
require("./src/config/database");

// Allows Angular application to make Http request to Express application
app.use(cors());

// Use body-parser
app.use(bodyparser.json());

/**
 * Routes Setup
 */
app.use(require("./src/routes"));

/**
 * Server Setup
 */
const port = process.env.PORT || "3000";
app.listen(port, () =>
    console.log(`Server is runinng on port number: ${port} ...`)
);
