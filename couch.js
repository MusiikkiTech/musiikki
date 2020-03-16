let helpers = require('./helpers.js');
let help = null;

function Couch(config) {
	this.config = config;
	help = new helpers.exports(config)
	let it = this;

	/*this.getViews(function onComplete(result) {
		it.viewFunctions = results;
		console.log(results)
	});*/

	return this;
}


/****************************************************************
 * Setup Functions
 ****************************************************************/
// curl -T ./views2.js 'http://admin:password@127.0.0.1:5984/musiikki/_design/views'
Couch.prototype.createView = function (filename, onComplete, onError, onChunk) {
	help.curl(`-T ./${filename}.js '${this.config.protocol}://${this.config.username}:${this.config.password}@${this.config.hostname}:${this.config.port}/${this.config.db}/_design/docs/_view/${filename}'`, onComplete, onError, onChunk);
};
/****************************************************************
 * Reality
 ****************************************************************/
Couch.prototype.view = function (viewname, onComplete, onError, onChunk) {
//curl http://localhost:5984/lullabot/_design/docs/_view/speakers 
    // _design/views/_view/hotdogs?type='hotdog'
	help.httpQuery('/_design/docs/_view/' + viewname, onComplete, onError, onChunk);
}; 
Couch.prototype.get = function (obj, onComplete, onError, onChunk) { 
	help.httpQuery(obj, onComplete, onError, onChunk);
};
Couch.prototype.post = function (obj, onComplete, onError, onChunk) {
	help.httpPost(obj, help.httpDefaultOptions(), onComplete, onError, onChunk);
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
/*
Couch.prototype.clone = function(obj, onComplete, onError) { 
	obj = help.clone(obj);
	obj.id = Number.uuid();

	this.save(obj, onComplete, onError)
};
*/
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
Couch.prototype.unpublish  = function(obj, onComplete, onError) { 
	obj.publish = false;
	this.save(obj, null, onComplete, onError);
};
Couch.prototype.delete  = function(obj, onComplete, onError) { 
	obj.hidden = true;
	this.save(obj, null, onComplete, onError);
};

exports.exports = Couch;