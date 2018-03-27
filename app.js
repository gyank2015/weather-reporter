// const request = require('request');
const yargs =require('yargs');
const geocode = require('./geocode/geocode.js');

const argv=yargs
.options({
    address:{
      description: 'Address to fetch weather for' ,
      alias: 'a',
      demand: true ,
      string : true
    }
})
.help()
.alias('help','h')
.argv;

geocode.geocodeAddress(encodeURIComponent(argv.a),(errormessage,result) =>{
  if(errormessage)
    console.log(errormessage);
  else
    console.log(JSON.stringify(result,undefined,2));
});

//console.log(argv);


// request({
//   url: 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDM37-wPAyYP6un8Zj30znBBQ8BBEwQavU&address='+encodedAddress ,
//   json: true
// },(error, response, body)=>{
//   //console.log(error);
//   //console.log(response);
//   if(error)
//     console.log('Unable to connect to Google Servers.');
//   else if(body.status==='ZERO_RESULTS')
//     console.log('Address not found.');
//   else
//   {
//     console.log(`Address: ${JSON.stringify(body.results[0].formatted_address)}.`);
//     console.log(`Latitude: ${JSON.stringify(body.results[0].geometry.location.lat)}`);
//     console.log(`Longitude: ${JSON.stringify(body.results[0].geometry.location.lng)}`);
//   }
// });
