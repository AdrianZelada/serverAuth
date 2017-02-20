/**
 * Created by iZel on 2/12/17.
 */
/**
 * Created by izel on 30-08-16.
 */
import r from '../db/db.js';
import $q from 'q';

class parentModel{

    constructor (model){
        this.model=model;
    }

    $all (){
        let defer = $q.defer();
        r.table(this.model)
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
    }

    $item (id,key){
        let defer = $q.defer();

        r.table(this.model)
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
    }

    $add (object){
        object.createdAt = r.now();
        let defer = $q.defer();

        console.log(object)
        r.table(this.model)
            .insert(object)
            .run(r.conn)
            .then(function (result) {
                defer.resolve(result)
            })
            .catch(function (e) {
                defer.reject(e)
            });

        return defer.promise;
    }

    $update (object){

        let defer = $q.defer();

        r.table(this.model)
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
    }

    $delete  (id){

        let defer = $q.defer();

        r.table(this.model)
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
    }
}

module.exports = parentModel