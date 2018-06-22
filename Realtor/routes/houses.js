var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/realtor');

var msg = { msg: "unauthorized" };

router.get('/', function(req, res) {
  var collection = db.get('House');
  collection.find({  }, function(err, houses){
    if (err) throw err;
    res.json(houses);
  });
});

router.post('/', function(req, res){
  if (req.session.user !== '5a1ed9c6edb1cab561708f01') {
    res.json(msg);
    return;
  }
  console.log(req.session.user); 

  var collection = db.get('House');
  collection.insert({
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    beds: req.body.beds,
    baths: req.body.baths,
    area: req.body.area,
    price: req.body.price,
    sellernm: req.body.sellernm,
    sellerem: req.body.sellerem,
    sellerph: req.body.sellerph,
    isAval: req.body.isAval
  }, function(err, house){
    if (err) throw err;
    res.json(house);
  });

  
});

router.get('/:id', function(req, res) {
  var collection = db.get('House');
  collection.findOne({
    _id: req.params.id, 
  }, function(err, house) {
    if (err) throw err;
    res.json(house);
  });
});

router.put('/:id', function(req, res){
  if (req.session.user !== '5a1ed9c6edb1cab561708f01') {
    res.json(msg);
    return;
  }

  var collection = db.get('House');
  collection.update({
    _id: req.params.id
  },
  {
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    beds: req.body.beds,
    baths: req.body.baths,
    area: req.body.area,
    price: req.body.price,
    sellernm: req.body.sellernm,
    sellerem: req.body.sellerem,
    sellerph: req.body.sellerph,
    isAval: req.body.isAval
  }, function(err, house){
    if (err) throw err;
    res.json(house);
  });


});

router.delete('/:id', function(req, res) {
  if (req.session.user !== '5a1ed9c6edb1cab561708f01') {
    res.json(msg);
    return;
  }
  var collection = db.get('House');
  collection.remove({ _id: req.params.id}, function(err, house){
    if (err) throw err;
    res.json(house);
  });
});

module.exports = router;