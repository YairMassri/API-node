const express = require('express');
const app = express();
const port = 3000;
const host = '127.0.0.1';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var stockMarket = [
    {
        id: '1',
        company: "Facebook",
        symbole: "FB",
        date: 7/26/2018,
        close: 176.26,
        volume: 5000000000
    }
];

var id = 1;

app.get('/stockMarket', (req, res) => {
    res.json(stockMarket);
});

app.get('/stockMarket/:id', (req, res) => {
    var stock = stockMarket.find(stock => {
        return stock.id == req.params.id
    });
 
    res.json(stock || {});
 });

 app.post('/stockMarket', (req, res) => {
     var stock = req.body;
     id++;
     stock.id = id + '';

     stockMarket.push(stock);

     res.json(stock);
 });

 app.put('/stockMarket/:id', (req, res) => {
     var update = req.body;
     if (update.id) {
         delete update.id;
     }

     var stock = stockMarket.findIndex(stock => stock.id == req.params.id);
     if (!stockMarket[stock]) {
         res.send();
     } else {
         var updateStock = Object.assign(stockMarket[stock], update);
         res.json(updateStock);
     }
     console.log(stock);
 });

 app.delete('/stockMarket/:id', (req, res) => {
    var stock = stockMarket.findIndex(stock => stock.id == req.params.id);
    if (!stockMarket[stock]) {
        res.send();
    } else {
        var deleteStock = stockMarket[stock];
        stockMarket.splice(stock, 1)
        res.json(deleteStock);
    }
 });

 app.listen(port, host, function () {
    console.log('Listrning on http://localhost:', port);
 })