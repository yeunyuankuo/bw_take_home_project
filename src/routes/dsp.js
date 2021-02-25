const router = require("express").Router();
const ad_db = require("../config/database");
const utils = require("../utils");
const Joi = require("joi");

// Schema for checking data types
const schema = Joi.object().keys({
    bid_floor: Joi.number().integer().required(),
});

/**
 * Get all ads in database
 */
router.get("/get_all_ads", async (req, res, next) => {
    try {
        let results = await ad_db.all();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

/**
 * Chooses the ad with the largest bid price that is greater than bid_floor
 *
 * Recieves a bid request with req.body in the format of JSON {"bid_floor": 12.00}
 * @returns ad info in JSON {price: 9, ad_id: 1}
 */
router.post("/bw_dsp", async (req, res, next) => {
    var emp = req.body;

    // check if the post body have the correct data type
    const valid = schema.validate(emp);

    if (valid.error == null) {
        try {
            let results = await ad_db.highestBidder();
            var bid_floor = emp.bid_floor;
            if (results.length > 0) {
                var random = utils.getRandomInteger(0, results.length - 1);
                var highest_bidder = results[random];
                if (highest_bidder.bidding_cpm < bid_floor) {
                    res.sendStatus(204);
                } else {
                    res.json({
                        price: highest_bidder.bidding_cpm,
                        ad_id: highest_bidder.ad_id,
                    });
                }
            } else {
                console.log("No match found in DB.");
                res.sendStatus(204);
            }
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    } else {
        res.status(422).json({
            message: "Invalid request",
            data: emp,
        });
    }
});

module.exports = router;
