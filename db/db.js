/**
 * Created by mike.mayori on 8/23/16.
 */
'use strict';

var config = require('./config');
var q = require('q');
var r = require('rethinkdb');
var moment = require('moment');
require('rethinkdb-init')(r);
var d = new Date();
var fDate = moment(d).format('MMMddYYYY');
var todayDB = "rti"+fDate;
// Create Tables
console.info(config)
r.init(config.rethinkdb, [
	{
		name: 'settings',
		primaryKey: 'id',
		indexes: ['db', 'current']
	},
	{
		name: 'users',
		primaryKey: 'sid',
		indexes: ['name', 'email', 'address', 'createdAt','phone','managers']
	}
])
	.then(function (conn) {
		r.conn = conn;
		r.conn.use(config.rethinkdb.db);
//		r.table("sessions").delete().run(r.conn);
	});

module.exports = r;