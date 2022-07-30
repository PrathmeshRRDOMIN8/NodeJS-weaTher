const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')
const messagethree = document.querySelector('#message-3')
const messagefour = document.querySelector('#message-4')
const messagefive = document.querySelector('#message-5')
const messagesix = document.querySelector('#message-6')
const messageseven = document.querySelector('#message-7')
// const messageeight = document.querySelector('#message-8')


weatherform.addEventListener('submit',(e) =>  {
     e.preventDefault()
     const b_id  = search.value 
     messageone.textContent = 'Loading ....' 
     messagetwo.textContent = ''
     messagethree.textContent = ''  
     messagefour.textContent = ''  
     messagefive.textContent = ''  
    fetch(' /business-info?business_id='+ b_id).then((response)=>{
    response.json().then((data)=>{
        if(data.error){    
            messageone.textContent = data.error
        }
        else{  
            messageone.textContent = 'Name: ' + data.Name
            messagetwo.textContent = 'City:   ' + data.City
            messagethree.textContent = 'Category: ' + data.Category 
            messagefour.textContent = ''
            messagefive.textContent = ''
            messagesix.textContent = ''
            // messageseven.textContent = 'Visiblity: ' + data.visiblity
            messageseven.textContent = ''
        
        }
    })
})
})