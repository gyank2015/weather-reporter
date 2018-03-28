const request = require('request');
const moment =require('moment');
const math =require('math');


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
      if(!error&&response.statusCode===200){
        var results ={
        Address: savedAddress,
        currentTime:moment(body.currently.time*1000).format("DD-MM-YYYY h:mm:ss"),
        currentTemperature : JSON.stringify(math.round((body.currently.temperature-32)*5/9),2)+'°C',
        apparentTemperature : JSON.stringify(math.round((body.currently.apparentTemperature-32)*5/9),2)+'°C',
        weatherType: body.currently.summary,
        humidity :JSON.stringify(math.round(body.currently.humidity*100),2)+'%',
        windSpeed: JSON.stringify(math.round(body.currently.windSpeed),2)+'mph',
        Prediction:body.daily.summary
      }
      callback(undefined ,results);
    }
    else
      callback('Unable to fetch weather.',undefined);
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
