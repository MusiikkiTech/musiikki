/**
 *  @title Helpers.js
 *
 *  @description This file is a collection of helpful small guys for 
 *  super common things I hate rewriting for the 100000th time.
 *
 *  @author Christopher Roy christopher.cj.roy@gmail.com
 *  @date Jan/01/1970
 */
function Helpers(config) {
	this.config = config;

	this.library = {}
	this.library.http = require('http');
	this.library.v8 = require('v8');
	this.library.uuid = require('uuid').v4;
}

/************************************************************
 * One liners
 ************************************************************/
Helpers.prototype.log = function(message) { if(!!this.config.debugMode) console.log(message); };
Helpers.prototype.onErrorGeneric = function(message) { this.log(message); };
Helpers.prototype.uuid = function() { return this.library.uuid(); } /* requires: npm install uuid; */


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
/*
Object.prototype.clone = function() {
	return Helpers.library.v8.deserialize(Helpers.library.v8.serialize(this));
}

Object.prototype.ea = function(fn, onComplete) {
  let list = Object.prototype.keys(this)

  for(let i = 0; i < list.length; i++)
    fn(this[i], i, propertyName);

  return this;
};

Array.prototype.ea = function(fn, onComplete) {
  for(let i = 0; i < this.length; i++)
  	fn(this[i], i);
  return this;
};
/**/
/************************************************************
 * CLI, HTTP, & CURL type of things.
 ************************************************************/
 
// Direct CLI command.
Helpers.prototype.shell = async function(str, onComplete = this.onComplete, onError = this.onError) {
	const { exec } = require("child_process");

	exec(str, (error, stdout, stderr) => {
	    if (error)
	        onError({error, stderr})
	    else
	    	onComplete(stdout);
	});
};

// CURL
Helpers.prototype.curl = async function(str, onComplete = this.onComplete, onError = this.onError) {
	this.shell('curl ' + str, onComplete, onError);
}

Helpers.prototype.httpPostableObject = function(obj) {
  return obj;
};

Helpers.prototype.httpDefaultOptions = function(type = 'POST', str = '', postData = {}) {
  return {
      requestString: str,
	  username: this.config.username,
	  password: this.config.password,
	  db: this.config.db,
	  hostname: this.config.hostname,
	  port: this.config.port,
	  path: '/',
	  domain: '',
	  protocol: 'http',
	  method: type,
	  headers: {
	    'Content-Type': 'application/x-www-form-urlencoded',
	    'Content-Length': Buffer.byteLength(JSON.stringify(postData))
	  }
  };
};

Helpers.prototype.httpQuery = async function(obj, onComplete = this.onComplete, onError = this.onError) {
  if(typeof obj == 'string')	
	this.httpGet(this.httpDefaultOptions({ requestString : obj }), onComplete, onError);
  else if(typeof obj.id != 'undefined')
  	this.httpGet(this.httpDefaultOptions({ requestString : obj.id }), onComplete, onError);
};

Helpers.prototype.httpGet = async function (httpOptions = this.httpDefaultOptions(), onComplete = this.onCompete, onError = this.onError, onChunk = this.onChunk) {
  this.curl(`-X GET ${ httpOptions.protocol }://${httpOptions.username}:${httpOptions.password}@${ httpOptions.hostname }:${httpOptions.port }/${httpOptions.db}/${httpOptions.requestString}`, onComplete, onError);
}

Helpers.prototype.httpPost = async function (obj, httpOptions = {}, onComplete = this.onCompete, onError = this.onError, onChunk = this.onChunk) {
  this.curl(`-H 'Content-Type: application/json' -X POST ${ httpOptions.protocol }://${httpOptions.username}:${httpOptions.password}@${ httpOptions.hostname }:${httpOptions.port }/${httpOptions.db}/ -d '` + JSON.stringify(obj) + "'", onComplete, onError);
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

console.dir(Helpers);

exports.exports = Helpers;
