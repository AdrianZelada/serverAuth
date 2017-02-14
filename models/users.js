/**
 * Created by iZel on 2/12/17.
 */
import r from '../db/db.js';
import $q from 'q';
import parentModel from '../models/parent-model';


class user extends parentModel{

    constructor(io){
        super('users')
    }
}

module.exports= user;