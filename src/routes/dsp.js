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
            let results = await ad_db.statusTrue();
            var bid_floor = emp.bid_floor;
            if (results.length > 0) {
                // random int between (1 to 10) for bid_price calculation
                var randomInt = utils.getRandomInteger(1, 10);

                // calculate bid_price for all ads in results[] and store in newResults[]
                var newResults = results.map(function (x) {
                    var info = {
                        bid_price: x.bidding_cpm * randomInt,
                        ad_id: x.ad_id,
                    };
                    return info;
                });

                // find max bid_price from newResults[]
                var max = utils.findMaxBidPrice(newResults);

                // preserve only the bidders with highest bid_price in highestBidders[]
                var highestBidders = newResults.filter(function (x) {
                    return x.bid_price == max;
                });

                // get a random index to determine which bidder wins the bidding
                var randomIndex = utils.getRandomInteger(
                    0,
                    highestBidders.length - 1
                );
                var highest_bidder = highestBidders[randomIndex];

                // return 204 if chosen highest_bidder.bid_price < bid_floor
                // else return highest_bidder {price, ad_id} as JSON
                if (highest_bidder.bid_price < bid_floor) {
                    res.sendStatus(204);
                } else {
                    res.json({
                        price: highest_bidder.bid_price,
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
