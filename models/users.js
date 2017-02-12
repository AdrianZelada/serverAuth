/**
 * Created by iZel on 2/12/17.
 */
// var parent = require('./models/parent-model');

module.exports=function () {
    var parent = require('../models/parent-model');
    parent.call(this,'users');




    return this;
}();

