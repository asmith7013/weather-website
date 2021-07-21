const path = require('path')
const express = require('express')
const hbs = require('hbs')
// const request = require('request')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup hbs engine & views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Alex Smith' 
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Alex Smith'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        helpMessage: "Please choose from options below to receive help",
        name: "Alex Smith"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }

        forecast(longitude, latitude, (error, forecastData) => {
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

app.get('/help/*', (req, res) => {
    res.render('404',{
        errorMessage: "Help article not found",
        title: "404 Help",
        name: "Alex Smith"
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        errorMessage: "Page not found",
        title: "404",
        name: "Alex Smith"
    })
})

app.listen(3000, () => {
    console.log('Server is serving on 3000.')
})