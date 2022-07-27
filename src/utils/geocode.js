const request = require('request')
const geocode = (address,callback) => {
    const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)   + '.json?access_token=pk.eyJ1IjoicHJhdGhtZXNocnJkb21pbjgiLCJhIjoiY2w1a3podjZ4MGFoajNrbnp6NjRsY2doZyJ9.MYiLglKOD38kyBf_3Yl5cg&limit=1'
    request({url :URL, json: true}, (error,response)=> {
        if(error){
            callback('Unable to fetch location services!', undefined)  
        }
        else if(response.body.features.length===0){
             callback('Invalid Search Result. Try again!', undefined)
        }
        else{
            callback(undefined,{ 
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                placeName: response.body.features[0].place_name 
            })
        }
    }) 
}

module.exports = geocode