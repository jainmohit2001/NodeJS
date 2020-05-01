const csvtojson = require('csvtojson');
const fs = require('fs');
const path = require('path');
const csvfile = 'customer-data.xls';
const fileName = 'customer-data.json';
const jsonFilePath = path.join(__dirname, fileName);
const csvFilePath = path.join(__dirname, csvfile);

csvtojson()
    .fromFile(csvFilePath)
    .then((jsonObject) => {
        var jsonContent = JSON.stringify(jsonObject,null,2);
        fs.writeFile(jsonFilePath, jsonContent, 'utf8', (error) => {
            if (error) return console.log(error.message);
            console.log('converted to json and Saved in', jsonFilePath);
        })
    });