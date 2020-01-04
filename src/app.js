const path = require("path")
const express = require("express")
const hbs = require("hbs")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

// Definne paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Set up handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", function (req, res) {
    res.render("index", {
        title: "Weather",
        name: "Peter Törnroos"
    })
})

app.get("/weather", function (req, res) {
    if (!req.query.address) {
        return res.send({
            error: "No address given"
        })
    }

    geocode(req.query.address, function (error, { latitude, longitude, location } = {}) {
 // Tämä ei toimi, antaa ilmoituksen "Cannot destructure property 'latitude' of 'undefined' as it is undefined."
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, function (error, forecastData){
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
           })
        })
    })
})

debugger

app.get("/products", function (req, res) {
    if (!req.query.search) {
        return res.send({
            error: "You must specify a search term"
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })    
})

app.get("/about", function (req, res) {
    res.render("about", {
        title: "About me",
        name: "Peter Törnroos"
    })
})

app.get("/help", function (req, res) {
    res.render("help", {
        title: "Help",
        name: "Peter Törnroos",
        paragraph: "Help text"
    })
})

app.get("/help/*", function (req, res) {
    res.render("page_not_found", {
        title: "404",
        name: "Peter Törnroos",
        errorMessage: "Help article not found"
    })
})

app.get("*", function (req, res) {
    res.render("page_not_found", {
        title: "404",
        name: "Peter Törnroos",
        errorMessage: "Page not found"
    })
})

app.listen(3000, function () {
    console.log("Server is up on port 3000.")
})