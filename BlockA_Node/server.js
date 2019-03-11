var http = require('http');
var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");
var bodyParser = require("body-parser");
const rp = require('request-promise');
app.use(bodyParser.urlencoded({ extended: false }));
const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
        start: 1,
        limit: 5000,
        convert: 'USD'
    },
    headers: {
        'X-CMC_PRO_API_KEY': '84a96291-be31-4203-b3dd-518c1d5d3334'
    },
    json: true,
    gzip: true
};

app.get('/', function (req, res) {
    var str = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><title></title></head><body>';
    rp(requestOptions).then(response => {
        //console.log('API call response:', response);
        for (var i = 0; i < response.data.length; i++)
        {
           str = str  + response.data[i].name.toString() + ' -- ' + response.data[i].quote.USD.price.toString() + ' -- ' + response.data[i].last_updated.toString() + '<br>';

        }
        str = str + '</body></html>';
        res.send(str);
    }).catch((err) => {
        console.log('API call error:', err.message);
        });
    //obj = JSON.parse(rp.r);


});

app.listen(process.env.PORT || 3000, function () {
    console.log("Started on PORT 3000");
})
