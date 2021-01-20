const geocode1 = require('./utils/geocode');
const forecast1 = require('./utils/forecast');
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const e = require('express');
console.log(__dirname); // /home/praveen/Documents/workspace/learn/node-course/web-server/src
// console.log(__filename)
const app = express()
const port = process.env.PORT || 3000
// vvv  define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views')
const partiaPath = path.join(__dirname, '../templates/partials')

// setup handlebar
// name and the value of module(hbs) below
app.set('view engine', 'hbs');

// setup handlebar loacation
// vvvv hbs default view in the views directory. if we changed it we set the path to the default hbs view
app.set('views', viewPath);
hbs.registerPartials(partiaPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    return res.render('index', {
        title: 'Weather app',
        name: 'Use this site to get your weather'
    })
});

app.get('/about', (req, res) => {
    return res.render('about', {
        title: 'About weather',
        name: 'About page '
    });
});
app.get('/help', (req, res) => {
    return res.render('help', {
        title: 'help Page',
        name: 'This the page to help you'

    })
}); 

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide the address'
        })
    } else {
        if (req.query.address) {
            const address = req.query.address;
            // below is the object destructuring from geocode.js retun data
            geocode1(address, (error, { latitude, longtitude, place_name } = {}) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                forecast1(latitude, longtitude, (error, forecastdata) => {
                    if (error) {
                        return res.send({
                            error
                        })
                    }
                    return res.send({
                        location: place_name,
                        forecast: forecastdata,
                        address

                    })
                })
            });
        } 
    }
});

app.get('/products', (req, res) => {
    return res.send({
        error: 'You need to provide the search params'
    })
});
// above is the same out for below

// app.get('', (req, res) => {
//     // respose in html
//     res.send('<h1>Hello Express</h1>');
// })

// app.get('/help', (req, res) => {
//     // response in object JSON
//     // send the obj the express convert to JSON
//     return res.send([{
//         Name: 'Aruthamizh',
//         Number: 8344359792
//     },{
//         Name: 'Aruthamizh',
//         Number: 8344359792
//     }])
// });
// app.get('/about', (req, res) => {
//     return res.send('<h3>This is the about route</h3>')
// });
app.get('/help/*', (req, res) => {
    return 	res.render('404',{
        title: 'Help artical not found'
    })
    });
app.get('*', (req, res) => {
return 	res.render('404',{
    title: 'Page not found'
})
}); 
app.listen(port, () => {
    console.log(`Server started on port` + port);
});    