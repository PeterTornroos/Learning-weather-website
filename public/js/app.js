console.log("Client side javascript file is loaded!")

//Selecting the form element from the HTML document. Returns a Javascript representation of the element.
const weatherForm = document.querySelector("form")
//Getting the value from the form submit
const search = document.querySelector("input")
//manipulate paragraph content with JS. To target an id, use #-sign
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

//event argument is typically shortened as "e"
weatherForm.addEventListener("submit", function (event) {
// Prevents forms default functionality to refres the page
    event.preventDefault()

    //grabbing the user input
    const location = search.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    //using the input to fetch weather
    fetch("http://nodecode.ddns.net:3000/weather?address=" + location).then(function (response) {
        response.json().then(function (data) {
            if (data.error) {
                messageOne.textContent = data.error
                // return console.log(data.error)
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})