// console.log('Client side file is loaded!') 

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//      response.json().then((data)=>{
//         console.log(data)
//      })
// }) 



const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')
const messagethree = document.querySelector('#message-3')
const messagefour = document.querySelector('#message-4')
const messagefive = document.querySelector('#message-5')

weatherform.addEventListener('submit',(e) =>  {
     e.preventDefault()
     const location  = search.value 
     messageone.textContent = 'Loading ....' 
     messagetwo.textContent = ''
     messagethree.textContent = ''  
     messagefour.textContent = ''  
     messagefive.textContent = ''  
    fetch(' /weather-page?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){    
            messageone.textContent = data.error
        }
        else{  
            messageone.textContent = 'Location: ' + data.Location
            messagetwo.textContent = 'Weather:   ' + data.Weather_Forecast
            messagethree.textContent = 'Temperature: ' + data.Temperature   
            messagefour.textContent = 'Feelslike: ' + data.Feelslike
            messagefive.textContent = 'Precipation chances: ' + data.Precipationchances + '%'
        }
    })
})
})