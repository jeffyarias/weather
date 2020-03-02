




const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('paragraphOne')
const messageTwo = document.getElementById('paragraphTwo')


weatherform.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = "Loading....."
    messageTwo.textContent = ""
    fetch('http://localhost:3001/weather?address='+ location).then((response) => {
     
    response.json().then((data)=> {
        if(data.error) {
            messageOne.textContent = data.error
            console.log(data.error)
        } else {

            console.log(data.location)
            console.log(data.forecast)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast

        }
        

    })
})
    
    console.log(location)
})
