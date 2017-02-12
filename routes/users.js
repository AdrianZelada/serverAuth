var express = require('express');
var router = express.Router();

var users= require('../models/users');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/users', function(req, res, next) {

  // users.$all().then(function(response){
  //   console.info(response)
  //   res.send('complete')
  // })

  // users.$add({name:'Adrian',lastName:'Zelada'}).then(function (response) {
  //   res.json(response)
  // });


  // users.$item('d76a3846-9701-4ab5-a631-26f2fcdf0897','sid').then(function (response) {
  //     res.json(response)
  // })
  //

  // users.$update({
  //   _key:'sid',
  //   name:'Walter',
  //   lastName:'Zelada',
  //   sid:'d76a3846-9701-4ab5-a631-26f2fcdf0897'
  // }).then(function (response) {
  //       res.json(response)
  //   })

  // users.$delete('d76a3846-9701-4ab5-a631-26f2fcdf0897').then(function (response) {
  //   res.json(response)
  // });

  users.queryModel('7c8fad3e-9aa4-4c17-854a-ffab28284691').then(function (response) {
      res.json(response)
  })

});

module.exports = router;
