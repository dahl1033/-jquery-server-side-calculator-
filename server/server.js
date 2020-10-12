const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 5000;

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended:true}));

let numberArray = [];

// GET route to send number array data
app.get('/calculator', (req, res)=>{
    res.send(numberArray);
})

// POST calculation result to object in server
app.post('/calculator', (req, res)=>{
    numberArray.unshift(req.body);
    // performing calculation based on operator input
    switch(numberArray[0].operator) {
        case `+`:
            numberArray[0].answer = Number(numberArray[0].inputOne) + Number(numberArray[0].inputTwo);
            break;
        case `-`:
            numberArray[0].answer = Number(numberArray[0].inputOne) - Number(numberArray[0].inputTwo);
            break;
        case `*`:
            numberArray[0].answer = Number(numberArray[0].inputOne) * Number(numberArray[0].inputTwo);
            break;
        case `/`:
            numberArray[0].answer = Number(numberArray[0].inputOne) / Number(numberArray[0].inputTwo);
            break;
    }
    res.sendStatus(200);
})

app.listen(port, ()=>{
    console.log('Server up and running at:', port);
})