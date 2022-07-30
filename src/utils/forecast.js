const request = require('request')

const weatherstack = (business_id,callback) =>{
    const weatherURL = 'https://esamudaay-api-smeet.herokuapp.com/productInfo/'+ business_id
      request({url : weatherURL , json:true}, (error,response) => {
          if(error){
              callback('Unable to fetch anaysis forecast!', undefined)  
          }
          else if(response.body.error){
              callback('Invalid Search Result. Try again!', undefined)
          }
          else {
              callback(undefined,{
                  TotalSkU: response.body.TotalSKU
              })
          }
      })
   }
module.exports = weatherstack