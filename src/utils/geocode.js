const request = require('request')
const geocode = (business_id,callback) => {
    const URL = 'https://api.test.esamudaay.com/api/v1/businesses/'+ business_id +'?format=json'
    request({url :URL, json: true}, (error,response)=> {
        if(error){
            callback('Unable to fetch location services!', undefined)  
        }
        // else if(response.body.features.length===0){
        //      callback('Invalid Search Result. Try again!', undefined)
        // }
        else{
            callback(undefined,{ 
                name: response.body.business_name ,
                addressname : response.body.address.address_name,
                isOpen : response.body.is_open,
                hasDelivery: response.body.has_delivery,
                hasSelfPickUp : response.body.has_self_pick_up,
                hasSmartBoxDelivery: response.body.has_smartbox_delivery,
                prettyaddr: response.body.address.pretty_address,
                city: response.body.address.geo_addr.city,
                state: response.body.address.geo_addr.state,
                pincode: response.body.address.geo_addr.pincode,
                category: response.body.bcats[0].name,
                categoryNumber: response.body.bcats[0].bcat, 
                upi_active: response.body.payment_info.upi_active,
                baseType: response.body.base_type,
                chat: response.body.chat_enabled,
            })
        }
    }) 
}

module.exports = geocode