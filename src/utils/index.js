class Utils {
    /**
     * Returns a random number between min (inclusive) and max (inclusive)
     * @param {*} min min (inclusive)
     * @param {*} max max (inclusive)
     */
    static getRandomInteger(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * Get the max bid price from array of bidders
     * @param {*} arr array of bidders
     */
    static findMaxBidPrice(arr) {
        var max = arr[0].bid_price;
        for (var i = 1; i < arr.length; i++) {
            if (max < arr[i].bid_price) {
                max = arr[i].bid_price;
            }
        }
        return max;
    }
}

module.exports = Utils;
