# Bidding server

A bidding server acts as a buyer in Real-Time Bidding. When there's an ad slot available for selling in the market, bidding server will receive a bid request. It should then choose an ad from its inventory, determine a bid price, and return the bid result to the seller.

You are required to implement a bidding server according to spec, and demonstrate your implementation's correctness and performance.


## Guideline

Follow these guidelines as much as you can:

* Your codebase should be at production level (for you to interpret what this means).
* Your codebase should be easy to introduce future specs.
* Your codebase should be easily understandable for other developers.


## Specs

* Bidding endpoint should be http://<your_domain>/bw_dsp
* Bidding endpoint receives requests by http POST. The format of post body should look like this:

```json
{
    "bid_floor": 12.00
}
```
`bid_floor: the minimum bid price (number)`

Use the bidding strategy described below to bid and send response. The format of response body should look like this:

```json
{
    "price": 15.00,
    "ad_id": "1"
}
```
`price: the result bid price (number)`

`ad_id: the ad id of your choice (string)`

Ads that are available for bidding are stored in a relational database. See [database](#database) for details.

### Bidding strategy:
1.  `Bid price = bidding_cpm * (random int between 1 and 10)`
1.  Choose the ad with the largest bid price
1.  Do not choose ads with `status=false`
1.  Return 204 without body if the final bid price is less than bid floor


## Database

Prepare a relational database as the data source of your bidding server.

* database name: `dsp_rtb`
* table name: `ad`

### `ad` Schema
| Column name  | Type |               Comment              |
|--------------|------|------------------------------------|
| ad_id        | int  | The id of advertising ad           |
| status       | bool | Bidding switch                     |
| bidding_cpm  | int  | Cost per 1000 impression           |

### Example Data
| ad_id | status | bidding_cpm |
|-------|--------|-------------|
|   1   |  true  |       5     |
|   2   |  false |       5     |
|   3   |  true  |       7     |
|   4   |  true  |       2     |
|   5   |  true  |       9     |
