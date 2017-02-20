/**
 * Created by iZel on 2/12/17.
 */
import r from '../db/db.js';
import $q from 'q';
import parentModel from '../models/parent-model';
import jwt from 'jsonwebtoken';
import config from '../bin/config';


class user extends parentModel{

    constructor(io){
        super('users')
    }

    $addUser (user,res){
        let defer =$q.defer();
        return jwt.sign({
            name:user.name,
            email:user.email
        },config.cert,
            { expiresIn: config.expTime }
        ,function (err,token) {
                if(err){
                    console.log(err);
                    defer.reject({
                        error:true,
                        message:'User Invalid'
                    });

                }else{
                    user.token=token;
                    console.log(token)
                    r.table('users')
                        .insert(user)
                        .run(r.conn)
                        .then(function (result) {
                            res.json(user)
                        })
                        .catch(function (e) {
                            res.json({
                                error:true,
                                message:'User Invalid'
                            })
                        });
                }
            })
    }
}

module.exports= user;