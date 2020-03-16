/**
 *  @title Helpers.js
 *
 *  @description This file is a collection of helpful small guys for 
 *  super common things I hate rewriting for the 100000th time.
 *
 *  @author Christopher Roy christopher.cj.roy@gmail.com
 *  @date Jan/01/1970
 */

function Helpers() {
	this.http = require('http');
	this.v8 = require('v8');
}

/************************************************************
 * One liners
 ************************************************************/
Helpers.prototype.log = function(message) { if(!!this.globals.debugMode) console.log(message); };
Helpers.prototype.onErrorGeneric = function(message) { this.log(message); };
Helpers.prototype.uuid = function(onComplete, onError) { help.shell('uuid', onComplete, onError); } /* requires: npm install uuid; */


/************************************************************
 * Defaulting interface 
 ************************************************************/
Helpers.prototype.emptyFunction = function() {};
Helpers.prototype.onComplete = function() {};
Helpers.prototype.onError = function() {};
Helpers.prototype.onChunk = function() {};

/************************************************************
 * Beautiful to write ONCE, else bore-hell.
 ************************************************************/
Object.prototype.clone = function() {
	return v8.deserialize(v8.serialize(this));
}

Object.prototype.ea = function(fn, onComplete) {
	let list = Object.prototype.keys(this);
	forEach(propertyName in list)
		fn(this[i], i, propertyName);
	return this;
};

Array.prototype.ea = function(fn, onComplete) {
  for(let i = 0; i < this.length; i++)
  	fn(this[i], i);
  return this;
};

/************************************************************
 * CLI, HTTP, & CURL type of things.
 ************************************************************/
 
// Direct CLI command.
Helpers.prototype.shell = async function(str, onComplete = Helpers.onCompete, onError = Helpers.onError) {
	const { exec } = require("child_process");

	exec(str, (error, stdout, stderr) => {
	    if (error)
	        onError({error, stderr})
	    else
	    	onComplete(stdout);
	});
}

// CURL
Helpers.prototype.curl = async function(str, onComplete = Helpers.onCompete, onError = Helpers.onError) {
	this.shell('curl ' + str, onComplete, onError);
}

Helpers.prototype.httpDefaultPostableObject = function(obj = {}) {
	return {
		id: obj.id | Number.uuid(),
		type: obj.type | 'no-type',
	};
};

Helpers.prototype.httpDefaultOptions = function(userOptions = {}, postData = '') {
	return {
	  username: userOptions | 'admin',
	  password: userOptions | 'password',
	  db: userOptions.db | 'musiikki',
	  hostname: userOptions.hostname | '127.0.0.1',
	  port: userOptions.port | 5984,
	  path: userOptions.path | '/',
	  method: userOptions.method | 'POST',
	  headers: userOption.headers | {
	    'Content-Type': 'application/x-www-form-urlencoded',
	    'Content-Length': Buffer.byteLength(JSON.stringify(postData))
	  }
	};
};

Helpers.prototype.httpQuery = async function() {
	// todo.
};

Helpers.prototype.httpGet = async function (obj, httpOptions = {}, onComplete = Helpers.onCompete, onError = Helpers.onError, onChunk = Helpers.onChunk) {
	this.curl(`-X GET ${ httpOptions.protocol }://${httpOptions.username}:${httpOptions.password}@${ httpOptions.host }:${httpOptions.port }/${httpOptions.requestString} -d ` + JSON.stringify(obj), onComplete, onError);
}

Helpers.prototype.httpPut = async function (obj, httpOptions = {}, onComplete = Helpers.onCompete, onError = Helpers.onError, onChunk = Helpers.onChunk) {
	this.curl(`-X PUT ${ httpOptions.protocol }://${httpOptions.username}:${httpOptions.password}@${ httpOptions.host }:${httpOptions.port }/${httpOptions.requestString} -d ` + JSON.stringify(obj), onComplete, onError);
}

Helpers.prototype.httpPost = async function (obj, httpOptions = {}, onComplete = Helpers.onCompete, onError = Helpers.onError, onChunk = Helpers.onChunk) {
	this.curl(`-H 'Content-Type: application/json' -X POST ${ httpOptions.protocol }://${httpOptions.username}:${httpOptions.password}@${ httpOptions.host }:${httpOptions.port }/${httpOptions.requestString} -d '` + JSON.stringify(obj) + "'", onComplete, onError);
};

/*
// HTTP
Helpers.prototype.httpGet = async function (urlString, onComplete = Helpers.onCompete, onError = Helpers.onError, onChunk = Helpers.onChunk) {
	let chunks = [];

	const req = http.request(urlString, (res) => {
	  Helpers.log(`STATUS: ${res.statusCode}`,
	  		      `HEADERS: ${JSON.stringify(res.headers)}`);
	  res.setEncoding('utf8');
	  res.on('data', (chunk) => { chunks.push(chunk); onChunk(chunk); });
	  res.on('end', onComplete);
	});
	req.on('error', onError);

	req.end();
};
*/

/*
Helpers.prototype.httpPost = async function (obj, userOptions = {}, 
											 onChunk = Helpers.emptyFunction, 
											 onComplete = Helpers.onComplete, 
											 onError = Helpers.onError) {
	let message = JSON.stringify(obj);
	let it = this;

	// Defaults
	let options = this.httpDefaultOptions(useOptions);

	const req = http.request(options, (res) => {
	  Helpers.log(`STATUS: ${res.statusCode}`,
	  		      `HEADERS: ${JSON.stringify(res.headers)}`);
	  res.setEncoding('utf8');

	  let chunks = [];
	  res.on('data', (chunk) => {
	  	chunks.push(chunk);
	  	onChunk(chunk)
	  });
	  res.on('end', (res) => {
	  	let results = {};
	  		results.message = chunks.join('');
	  		results.responce = res;
	  	onComplete(results)
	  });
	});

	req.on('error', onError);

	req.write(message);
	req.end();
};
*/

exports.help = Helpers;