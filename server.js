const express = require('express')
const hbs = require('hbs');
const path = require('path');
const geocode = require('./util/geocode');
const forecast = require('./util/forecast');



const app = express();
// Define paths to Express configuration
//const publicDirectoryPath = path.join(__dirname, '../public')


app.use(express.static(`${__dirname}/public`));
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');


// Setup handlerbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Setup static directtory to server
//app.use(express.static(publicDirectoryPath))




app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Jeffrey Arias'

    })
})

app.get('/about', (req, res)=>{
 res.render('about', {
     title: 'About me',
     name: 'Jeffrey Arias'
 })


})

app.get('/help', (req, res)=>{
res.render('help', {
    title: 'Help',
    name: 'Jeffrey Arias'
})

})

app.get('/products', (req, res)=>{
if(!req.query.search) {
    return res.send({
        error: "You must provide a search term"
    })



}

   console.log(req.query.search)
    res.send({
     products:[]


    })



})

app.get('/weather', (req, res)=> {
   console.log("Yeaaaaaaahhhhhhhhhhh")
    if(!req.query.address) {
     return res.send(
         { error: 'You must to enter an address'}
         )
    }


geocode(req.query.address, (error, { latitude, longitude, location} )=> {
console.log("Hey brown cow")
 
 
    if (error) {console.log("Hey black cow")
     return res.send({ error }) 
 }
console.log("hey white cow")
 forecast(latitude, longitude, (error, forecastData)=> {
     console.log("Helloooooooooooooooo")
  if (error) {
      console.log("hello, hello")
   res.send({error})
   
      
  } console.log("Hello error again", error)
  console.log("klklklklklkllkl")
  console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
 
   res.send({
    forecast: forecastData,
    location,
    //address: req.query.address
  })
 

 })

})






})

app.get('/footer', (req, res)=>{
    res.render('footer', {

        title: 'footer',
        name: "Jeffrey Arias"
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Jeffrey Arias',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res)=> {
    res.render('404', {
        title: '404',
        name: 'Jeffrey Arias',
        errorMessage: 'Page not found'
    })
});
const port = process.env.PORT || 3001

app.listen(port, ()=>{console.log(`Server start at port ${port}`)})