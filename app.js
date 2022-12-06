import express from "express";
import bodyParser from 'body-parser'
import http from 'node:http'


const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("./"))

app.get("/", (req, res) => {

    res.sendFile('index.html', { root: "./" })

})
app.post("/", (req, res) => {
    const inputCity = req.body.inputCity
    const apiKey = ""             //enter Your Api Id
    const unitSystem = 'metric';
    const apiURL = "http://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&units=" + unitSystem + "&appid=" + apiKey

    http.get(apiURL, (response) => {
        console.log(response.statusCode)
        response.on("data", (data) => {
            const parsedData = JSON.parse(data)
            const cityName = parsedData.name
            const cityTemp = parsedData.main.temp
            const weatherDesc = parsedData.weather[0].description
            const iconCode = parsedData.weather[0].icon
            const iconSrc = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png"
            const finalOutput = "<img src='" + iconSrc + "' alt='image'><h1> Your " + cityName + "'s Temperature is " + cityTemp + " and it's " + weatherDesc + "</h1>"
            res.send(finalOutput)
        })

    })



})

app.listen(port, () => {
    console.log("your server is live")
})

