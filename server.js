const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./user-route");
const testRoutes = require("./test-route");

const app = express();

app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/test', testRoutes);

app.listen(3000, () => console.log("running on port", 3000));