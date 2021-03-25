const express = require("express");
const axios = require("axios").default;

const router = express.Router();

router.get("", (req, res) => {
    axios.get("https://jsonplaceholder.typicode.com/todos/1")
        .then((response) => {
            res.status(response.status).send(response.data);
        })
        .catch((err) => res.send(err));
});

module.exports = router;