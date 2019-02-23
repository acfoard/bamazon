const db = require('../models');
const tempOrder = require('../data/tempOrder.js');

module.exports = function(app) {

    app.get('/api/product', function(req, res) {
        db.product.findAll().then(function(productList){
            res.json(productList);
        }).catch(function(error) {
            res.json({error: error});
        });
    });

    app.get('/api/product/:id', function(req, res) {
        db.product.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(productList){
            res.json(productList);
        }).catch(function(error) {
            res.json({error: error});
        });
    });

    app.put('/api/product/:id', function(req, res) {
        db.product.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(function(num){
            res.json({message: "success"});
        }).catch(function(error) {
            res.json({error: error});
        });
    });

    app.get('/api/tempOrder', function(req, res) {
        res.json(tempOrder.order);
    });

    app.post('/api/tempOrder', function(req, res) {
        tempOrder.order.push(req.body);
        res.json({message: "done"});
    });

    app.put('/api/tempOrder', function(req, res) {
        currQty = parseInt(tempOrder.order[req.body.index].qty);
        addQty = parseInt(req.body.qty);
        tempOrder.order[req.body.index].qty = currQty + addQty; 
        res.json(tempOrder);
    });

    app.delete('/api/tempOrder', function(req, res) {
        tempOrder.order.length = 0;
        res.json(tempOrder);
    });
    
};