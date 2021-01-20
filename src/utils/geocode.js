const request = require('request');
const mapbox = 'pk.eyJ1IjoiYXJ1bnRoYW1pemgiLCJhIjoiY2trMjVjZjVuMHkzYTJudDFjd3k4d3RiOCJ9.XzAP1a27CwoXQ16kF3R5_g';
const geocode = (address, callback) => {
    console.log('address geocode',address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/` + address + `.json?access_token=` + mapbox + `&limit=1`;
    // console.log(geocodeURL);
    request({ url, json: true }, function (error, { body }) {
        // extra work
        // console.log('center asdfdfdfsdfsdfsd',body.features.length);
        const center =body.features.length;
        if (center == 0) {
            return callback('unable to connect to location services', undefined);
        } 
        // else{
            const resObjectRestructuring ={
    
                latitude: body.features[0].center[0],
                longtitude: body.features[0].center[0],
                place_name: body.features[0].place_name
            }
    
            const {latitude, longtitude, place_name } = resObjectRestructuring;
    
            if (error) {
                return callback('unable to connect to location services', undefined);
            }
            try {
                if (body.features[0]) {
                        callback(undefined, {
                            latitude,
                            longtitude,
                            place_name
                        })
                } else {
                    console.log('unable to location')
                }
            } catch (err) {
                console.log('Error geo', err)
            }
        // }
    })    
}
module.exports = geocode

// latitude: 79.810641,
//   longtitude: 79.810641,
//   place_name: