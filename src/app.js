const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000


// Define Path for Express Configuration.
const publicDirectoryPath = path.join(__dirname,'../public') 
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine' , 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static Directory to serve
app.use(express.static(publicDirectoryPath))
// app.get('',(request,response)=> {
//     response.send('<h1>Hello Express!</h1>')
//    }) // Root page will only be used when Express and Path will be unable to find any HTML page.
 
app.get('',(req,res) => {
   res.render('index',{
      title: 'Businesses',
      name : 'Team DOMIN8'  
   }) 
 })

 app.get('/analysis', (request,response)=>{
   if(!request.query.business_id){
      return response.send({
         error: 'You must provide an Address'
      })
   }
   else{
      weatherstack(request.query.business_id,(error,{totalSku}={}) =>{
         if(error){
            return response.send({error})
        }
        else{
          response.send({
            SKU: totalSku
         })
        }
        
      })
      response.render('help',{
         helptext:'Data processed and analysed for e-samudaay hackathon',
         title: 'Help',
         name: 'Team DOMIN8'
       })
   }
 })



 app.get('/business-info',(request,response)=>{
   if(!request.query.business_id){
      return response.send({
         error: 'You must provide an Address'
      })
   }

   else{
      geocode(request.query.business_id, (error,{name,addressname,isOpen,hasDelivery, chat, baseType,categoryNumber,hasSelfPickUp,upi_active,hasSmartBoxDelivery,prettyaddr,city,state,pincode,category}={}) => {
          if(error){
              return response.send({error})
          }
          else{
            response.send({
               Name: name,
               AddressName : addressname,
               PrettyAddr: prettyaddr,
               City: city,
               State : state,
               Pincode : pincode,
               Category : category,
               Open: isOpen,
               Delivery: hasDelivery,
               SelfPickup:hasSelfPickUp,
               SmartBoxDelivery:hasSmartBoxDelivery,
               UPI : upi_active,
               Category_Number : categoryNumber,
               Type : baseType,
               Chat : chat,
            })
          }
      })
  }
 }) 

 app.get('/about',(request,response)=>{
   response.render('about',{
     title:'About us',
     name: 'Team DOMIN8' 
   })  
})

 app.get('/help/*', (request,response)=>{
   response.render('404',{
      title: '404',
      errormessage: 'Data not found.',   
      name: 'Team DOMIN8'
   }) 
})

 app.get('*',(request,response)=>{
   response.render('404',{
      title: '404',
      errormessage: 'Page not found',
      name: 'Team DOMIN8'
   })
 })
 
 app.listen(port,() => {
    console.log('Server is up on port '+ port)
 })