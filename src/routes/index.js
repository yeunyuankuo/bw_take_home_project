const router = require("express").Router();

// connects to dsp route
router.use(require("./dsp"));

// default route
router.get("/", (req, res, next) => {
    res.send("App works!");
});

// catches undefined routes
router.get("*", (req, res, next) => {
    res.send("App works!");
});

module.exports = router;
