let help = require('./helpers.js');

function Couch(config) {
	this.config = config;

	return this;
}

/****************************************************************
 * Reality
 ****************************************************************/
Couch.prototype.get = function (obj, onChunk, onComplete, onError) { 
	help.httpGet(urlString, onChunk, onComplete, onError); 
};
Couch.prototype.put = function (obj, onChunk, onComplete, onError) {
	help.httPut(obj, onChunk, onComplete, onError) {
};
Couch.prototype.post = function (obj, onChunk, onComplete, onError) {
	help.httPost(obj, onChunk, onComplete, onError) {
};

/****************************************************************
 * Queries
 ****************************************************************/
Couch.prototype.listAll = function(strType, onComplete, onError) {  
  	console.log('todo');
};

/****************************************************************
 * Interface
 ****************************************************************/
Couch.prototype.load = function(obj, onComplete, onError) { 
	this.get(obj, onComplete, onError);
};
Couch.prototype.save = function(obj, onComplete, onError) { 
	this.post(obj, onComplete, onError);
};
Couch.prototype.clone = function(obj, onComplete, onError) { 
	obj = help.clone(obj);
	obj.id = Number.uuid();

	this.save(obj, onComplete, onError)
};
Couch.prototype.delete = function(obj, onComplete, onError) { 
	obj.hide = true;
	this.save(obj, null, onComplete, onError)
};
Couch.prototype.suspend = function(obj, onComplete, onError) { 
	obj.suspend = true;
	this.save(obj, null, onComplete, onError);
};
Couch.prototype.activate = function(obj, onComplete, onError) { 
	obj.suspend = false;
	this.save(obj, null, onComplete, onError);
};
Couch.prototype.publish  = function(obj, onComplete, onError) { 
	obj.publish = true;
	this.save(obj, null, onComplete, onError);
};
