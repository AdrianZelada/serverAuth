/**
 * Created by iZel on 2/14/17.
 */

import jwt from 'jsonwebtoken';
import config from '../bin/config';
import r from '../db/db';

var defaults={
    authentication:false,
    expiration:{
        status:false,
        time:100000
    },
    fixedToken:true,
    defaultToken:[
        { name: 'default' , token:'SirZelada'}
    ],
    tableToken:'users',
    withoutToken:[],
    stateRedirect:[]
};

module.exports=function (app,options) {
    let settings = Object.assign({},defaults,options);

    if(!settings.authentication){
        app.use(function(req, res, next){
            next();
        });
    }else{
        let tokens = settings.defaultToken.map((val)=>{
            return val.token;
        });

        app.use(function(req, res, next){

            if(req.accepts()[0]!='text/html' && req.get('Content-Type') != 'application/json'){
                next();
            }else{
                if(settings.withoutToken.indexOf(req.path)!=-1){
                    next();
                }else {
                    let token = req.headers['x-access-token'];
                    if (token) {
                        if (settings.fixedToken) {
                            if (tokens.indexOf(token) != -1) {
                                next()
                            } else {
                                redirecToError(res);
                            }
                        } else {
                            r.table(settings.tableToken)
                                .filter(r.row('token').eq(token))
                                .coerceTo('array')
                                .run(r.conn)
                                .then((result) => {
                                    if (result.length > 0) {
                                        if (settings.expiration.status) {
                                            jwt.verify(token, config.cert, function (err, decode) {
                                                if (err) {
                                                    expiredToken(res, err)
                                                } else {
                                                    next()
                                                }
                                            });
                                        } else {
                                            next();
                                        }
                                    } else {
                                        redirecToError(res)
                                    }
                                }).catch((e) => {
                                redirecToError(res)
                            })
                        }
                    } else {
                        redirecToError(res);
                    }
                }
            }
        })
    }

    let redirecToError = (response)=>{
        return response.status(403).send({
            success: false,
            message: 'This App is Secured and Restricted..'
        });
    };

    let expiredToken = (response, error)=>{
        return response.status(402).send({
            success: false,
            message: 'Token expired',
            error:error
        });
    }
};