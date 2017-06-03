const express = require('express');
const moment = require('moment');

// create our Express app
const app = express();

// In Cloud9 use port 8080

app.get('/', (req, res) => {
    res.send('Welcome! try a url like /1450137600');
});

// To run your application run the command node server.js in your console.
app.get('/:dateInput', (req, res) => {
    
    // check if date param is unix time stamp or natural language date
    // https://timestamp-ms.herokuapp.com/December%2015,%202015
    // https://timestamp-ms.herokuapp.com/1450137600
    
    const dateInput = req.params.dateInput;
    
    // if (isNaN(dateInput)) {
    //     dateInput = dateInput.replace('%20', ' ');
    // } else {
    //     // 1450137600
    //     dateInput *= 1000;
    // }
    
    const givenDate = moment(dateInput, ['X', 'MMMM D, YYYY']);
    
    if (givenDate.isValid()) {
        
        res.json({ 'unix': givenDate.format('X'), 'natural': givenDate.format('MMMM D, YYYY') });
        return;
    }
        
    res.json({ 'unix': null, 'natural': null });
    
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Timestamp app started!')
});