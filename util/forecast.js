const request = require('request');
const forecast = (latitude, longitude, callback)=>{

    const url = 'https://api.darksky.net/forecast/2778d67989903aef44bc1f05382ce6a4/' + latitude + ',' + longitude;

     request({url, json: true}, (error, { body }) => { 
      if(error) {
          callback('Unable to connect to weather services!', undefined)


      } else if(body.error) {
      callback('Unable to find Location', undefined)


      } else {
          console.log( "hello", body.daily.data[0])
         
       callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. The hight today is ' + body.daily.data[0].temperatureHigh + ' The Low today is ' + body.daily.data[0].temperatureLow + ' There is a ' + body.currently.precipProbability + '% chance of rain.')


      }
      

     })

}

module.exports = forecast;