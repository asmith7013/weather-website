
const request = require("request")

const forecast = (longitude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=68160596e6ddd45445c5a1e8d1cb4d9d&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true}, (error, { body }) => {
        if (error){
            callback('No valid internet connection available!')
        } else if (body.error) {
            callback('Provided coordinate invalid. Please try again!')
        } else {
            callback(undefined, {
                current_weather: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feels_like: body.current.feelslike,
                wind_speed: body.current.wind_speed
            })
        }
    })
}

module.exports = forecast