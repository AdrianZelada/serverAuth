var express = require('express');
var router = express.Router();

function routerUser(io){
    let classUsers= require('../models/users');
    let users= new classUsers(io);

    router.get('/', function(req, res, next) {
        res.send('respond with a resource');
    });


    router.get('/users', function(req, res) {
      users.$all().then(function(response){
        console.info(response)
        io.emit('responseIO',{name:'Adrian'});
        res.send('complete')
      })
    });
    return router;
}

module.exports = routerUser;
