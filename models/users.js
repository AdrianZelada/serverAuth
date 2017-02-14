/**
 * Created by iZel on 2/12/17.
 */
var r = require('../db/db.js');
var $q =require('q');
var parentModel= require('../models/parent-model');


class user extends parentModel{

    constructor(io){
        super('users')
    }
}

module.exports= user;