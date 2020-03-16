/******************************************************
 * Database Interface
 ******************************************************/
let help = require('helpers.js');

function Database(dbName, host, port, dbName, username, password) {
	this.couch = {};// couchOnly functions
	
	this.host = host;
	this.port = port;
	this.dbName = dbName;
	this.username = username;
	this.password = password;

	return this;
}

Database.prototype.newUUID = function() { return Number.uuid(); }

/******************************************************
 * Used by user defined classes that reflect dbtypes. 
 *  eg: pages, accounts, articles, etc...
 ******************************************************/
Database.prototype.get = function(obj) { this.couch.save(obj); };
Database.prototype.save = function(obj) { this.couch.save(obj); };
Database.prototype.clone = function(obj) { this.couch.clone(obj); };
Database.prototype.delete = function(obj) { this.couch.remove(obj); };
Database.prototype.suspend = function(obj) { this.couch.suspend(obj); };
Database.prototype.activate = function(obj) { this.couch.activate(obj); };
Database.prototype.publish  = function(obj) { this.couch.publish(obj); };

/******************************************************
 * CouchDB Only
 ******************************************************/
Database.prototype.couch.query = function (obj) {};

Database.prototype.couch.getStatus = function(onComplete) {
	this.get(`http://${this.username}:${this.password}@${this.host}:${this.port}`,
			 function onChunk() {}, 
			 onComplete,
			 function onError(msg) { help.log(msg); });
}

Database.prototype.couch.get = function (urlString, onChunk, onComplete, onError) { 
	help.http.get(urlString, onChunk, onComplete, onError); 
};
Database.prototype.couch.post = function (obj, urlString, onChunk, onComplete, onError) {
	help.http.post(obj, onChunk, onComplete, onError) {
};

Database.prototype.couch.save = function(obj, onComplete, onError) { 
	help.http.post(obj, onComplete, onError);
};
Database.prototype.couch.clone = function(obj, onComplete, onError) { 
	obj = help.clone(obj);
	obj.id = Number.uuid();

	this.couch.save(obj, onComplete, onError)
};
Database.prototype.couch.delete = function(obj, onComplete, onError) { 
	obj.hide = true;
	this.post(obj, null, onComplete, onError)
};
Database.prototype.couch.suspend = function(obj, onComplete, onError) { 
	obj.suspend = true;
	this.post(obj, null, onComplete, onError);
};
Database.prototype.couch.activate = function(obj, onComplete, onError) { 
	obj.suspend = false;
	this.post(obj, null, onComplete, onError);
};
Database.prototype.couch.publish  = function(obj, onComplete, onError) { 
	obj.publish = true;
	this.post(obj, null, onComplete, onError);
};
Database.prototype.couch.unpublish  = function(obj, onComplete, onError) { 
	obj.publish = false;
	this.post(obj, null, onComplete, onError);
};


exports.db = Database;