const request = require('request')

const weatherstack = (lat, lon, callback) =>{
    const weatherURL = 'http://api.weatherstack.com/current?access_key=85e7abcd3c2529772dcdfff6900dbde4&query='+ lat +',' + lon + '&units=m'
      request({url : weatherURL , json:true}, (error,response) => {
          if(error){
              callback('Unable to fetch weather forecast!', undefined)  
          }
          else if(response.body.error){
              callback('Invalid Search Result. Try again!', undefined)
          }
          else {
              callback(undefined,{
                  weatherDescriptions : response.body.current.weather_descriptions[0],
                  temperature: response.body.current.temperature,
                  feelslike: response.body.current.feelslike,
                  precipPercentage: response.body.current.precip,
              })
          }
      })
   }
module.exports = weatherstack