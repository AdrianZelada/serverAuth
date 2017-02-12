/**
 * Created by iZel on 2/12/17.
 */
/**
 * Created by izel on 30-08-16.
 */
var r = require('../db/db.js');
var $q = require('q');

function parentModel (model){

    this.$all     =   function(){
        var defer = $q.defer();
        r.table(model)
            .orderBy(r.desc('createdAt'))
            .coerceTo('array')
            .run(r.conn)
            .then(function (result) {
                defer.resolve(result)
            })
            .catch(function (e) {
                defer.reject(e)
        });

        return defer.promise
    };

    this.$item       =   function(id,key){
        var defer = $q.defer();

        r.table(model)
            .filter(
                r.row(key || 'id').eq(id)
            )
            .coerceTo('array')
            .run(r.conn)
            .then(function (result) {
                defer.resolve(result)
                // response.json(result);
            })
            .catch(function (e) {
                defer.reject(e)
        });

        return defer.promise;
    };

    this.$add       =   function(object){
        object.createdAt = r.now();
        var defer = $q.defer();

        r.table(model)
            .insert(object)
            .run(r.conn)
            .then(function (result) {
                defer.resolve(result)
            })
            .catch(function (e) {
                defer.reject(e)
        });

        return defer.promise;
    };

    this.$update    =  function(object){

        var defer = $q.defer();

        r.table(model)
            .filter(
                r.row(object._key).eq(object[object._key])
            )
            .update(object)
            .run(r.conn)
            .then(function (result) {
                defer.resolve(result)
            })
            .catch(function (e) {
                defer.reject(e)
            });

        return defer.promise;
    };

    this.$delete    =   function(id){

        var defer = $q.defer();

        r.table(model)
            .get(id)
            .delete()
            .run(r.conn)
            .then(function(result) {
                defer.resolve(result)
            })
            .catch(function (e) {
                defer.reject(e)
            });

        return defer.promise;
    };


    function handleError(res) {
        return function(error) {
            return res.status(500).json({error: error});
        }
    }
}

module.exports= parentModel;