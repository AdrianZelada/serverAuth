/**
 * Created by iZel on 2/12/17.
 */
var r = require('../db/db.js');
var $q =require('q');

module.exports=function () {
    var model='users';
    var parent = require('../models/parent-model');
    parent.call(this,model);


    this.queryModel=function (id) {
        var defer = $q.defer();
        r.table(model)
            .get(id)
            .run(r.conn)
            .then(function (result) {
                defer.resolve(result)
            })
            .catch(function (e) {
                defer.reject(e)
            });
        return defer.promise;
    };

    return this;
}();

