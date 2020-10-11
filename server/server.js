const express = require ('express');
const bodyParser = require ('body-parser');

const app = express();
const port = 5000;

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/dogNames', (req, res) => {
    res.send(dogNameData);
})

app.post('/dogNames', (req, res) => {
    console.log(req.body);
    dogNameData.push(req.body);
    res.sendStatus(200);
}

app.listen(port, () => {
    console.log('Up and running on port: ', port);
});