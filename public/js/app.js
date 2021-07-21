const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = "Loading . . . "
    messageTwo.textContent = ""

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = 'Error: ' + data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = 'Current weather: ' + data.forecast.current_weather + ', Temperature: ' + data.forecast.temperature + 
                        ', Feels Like: ' + data.forecast.feels_like
            }
        })
    })
})