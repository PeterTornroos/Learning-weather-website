const request = require("request")

const forecast = function(lat, long, callback) {
    const url = "https://api.darksky.net/forecast/a3d8524287bc5dd062615f363c86e496/" + lat + "," + long + "?units=si"

    request({ url, json: true }, function(error, { body }) {

        if(error) {
            callback("Cannot connect to server", undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined)
    } else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain. Highest temeperature for the day is " + body.daily.data[0].temperatureHigh + " degrees and lowest temperature is " + body.daily.data[0].temperatureLow + " degrees.")
        }
    })
}

module.exports = forecast