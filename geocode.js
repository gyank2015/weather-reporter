const request = require('request');


var geocodeAddress = (address,callback)=>{

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDM37-wPAyYP6un8Zj30znBBQ8BBEwQavU&address='+address ,
  json: true
},(error, response, body)=>{
  //console.log(error);
  //console.log(response);
  if(error)
    callback('Unable to connect to Google Servers.',undefined);
    // console.log('Unable to connect to Google Servers.');
  else if(body.status==='ZERO_RESULTS')
    callback('Address not found.',undefined);
    //console.log('Address not found.');
  else
  {
    var savedAddress=JSON.stringify(body.results[0].formatted_address);
    request({
      url: `https://api.darksky.net/forecast/f67ea4a28217b5aec90d9459c395322d/${JSON.stringify(body.results[0].geometry.location.lat)},${JSON.stringify(body.results[0].geometry.location.lng)}`,
      json :true
    },(error,response,body)=>{
      var results ={
        Address: savedAddress,
        currentTemperature : JSON.stringify(body.currently.temperature)+'F',
        apparentTemperature : JSON.stringify(body.currently.apparentTemperature)+'F',
        weatherType: body.currently.summary,
        humidity :JSON.stringify(body.currently.humidity*100)+'%',
        windSpeed: JSON.stringify(body.currently.windSpeed)+'mph'
      }
      callback(undefined ,results);
    });

    // console.log(`Address: ${JSON.stringify(body.results[0].formatted_address)}.`);
    // console.log(`Latitude: ${JSON.stringify(body.results[0].geometry.location.lat)}`);
    // console.log(`Longitude: ${JSON.stringify(body.results[0].geometry.location.lng)}`);
  }
});
};



module.exports={
  geocodeAddress
};
