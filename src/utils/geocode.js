const request = require("request")

const geocode = function(address, callback) {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibGFydXBldGUiLCJhIjoiY2s0NnhhMmo5MGw0azNsbDllbzc3NG5vbCJ9.aj2SoJKQHyWfTdLvQn1hwg&limit=1"

    request({ url, json: true }, function(error, { body }) {
        const responseLength = body.features.length
        
        if (error) {
            callback("Unable to connect to location services", undefined)
        } else if (responseLength === 0) {
            callback("Unable to find location. Try another search", undefined)
        } else {

            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode