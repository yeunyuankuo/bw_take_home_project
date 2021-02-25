const mysql = require("mysql");

/**
 * Configures mysql database
 */
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "****",
    database: "dsp_rtb",
});

let ad_db = {};

/**
 * Gets all the ads in database `ad`
 */
ad_db.all = () => {
    return new Promise((resolve, reject) => {
        var sql_query = `SELECT * FROM ad`;
        pool.query(sql_query, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

/**
 * Get all the ads with the highest bidding_cpm and status == true
 */
ad_db.highestBidder = () => {
    return new Promise((resolve, reject) => {
        var sql_query = `SELECT ad_id, bidding_cpm FROM ad WHERE bidding_cpm = (SELECT MAX(bidding_cpm) FROM ad WHERE status = 1)`;
        pool.query(sql_query, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

module.exports = ad_db;
