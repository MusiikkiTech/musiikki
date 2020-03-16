let help = require('helpers.js');
let markdown = require('marked');
let sanitiseHTML = require('insain');

function Pages(db) {
	this.db = db;

	this.id = pageId | this.db.uuid();
	this.created = Date.now()
	this.lastUpdated = Date.now();
	this.hits = 0;
	this.type = 'page';
	this.name = 'untitled';
	this.content = '';// string : format plaintext or markdown to be auto HTMLified

	return this;
}

/**************************************************
 * Interface
 **************************************************/
Pages.prototype.updateObject = function(obj, onComplete, onError) {
	let it = this;
	obj.ea(function(elem, id, propertyName) {
		it[propertyName] = elem;
	});
	this.save(onComplete, onError)
	return it;
};

Pages.prototype.getHTML = function() { return sanitiseHTML(markdown.toHTML(this.content)); };
Pages.prototype.getSaveableObject = function() {
	let it = this;

	return {
		id: it.id,
		type: it.type,
		name: it.name,
		content: it.content,
		created: it.created;
	    lastUpdated: it.lastUpdated;
	    hits: it.hits;
	};
}

/**************************************************
 * Database calls
 **************************************************/
Pages.prototype.getById = function(onComplete, onError) { this.db.save(this.getSaveableObject()); };
Pages.prototype.getByName = function(onComplete, onError) { this.db.save(this.getSaveableObject()); };
Pages.prototype.save = function(onComplete, onError) { this.db.save(this.getSaveableObject()); };
Pages.prototype.clone = function(onComplete, onError) { this.db.clone(this.getSaveableObject()); };
Pages.prototype.delete = function(onComplete, onError) { this.db.remove(this.getSaveableObject()); };
Pages.prototype.suspend = function(onComplete, onError) { this.db.suspend(this.getSaveableObject()); };
Pages.prototype.activate = function(onComplete, onError) { this.db.activate(this.getSaveableObject()); };
Pages.prototype.publish = function(onComplete, onError) { this.db.publish(this.getSaveableObject()); };

exports.pages = Pages;