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
}

module.exports = Utils;
