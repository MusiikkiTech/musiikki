let config = require('./config.js')
let helpers = require('./helpers.js');
let help = new helpers(config);

let onComplete = function(results) { console.log('complete', results) }
let onChunk = function(results) { console.log('chunk', results) }
let onError = function(results) { console.log('error', results) }

(async function() { console.log('shell'); await help.shell('echo shell success', onComplete, onError); })();
(async function() { console.log('curl'); await help.curl('http://admin:password@127.0.0.1:5984/musiikki/', onComplete, onError); })();
(async function() { console.log('httpPut'); await help.httpPut(help.httpPostableObject({ name:'test-taco' }), help.httpDefaultOptions(), onComplete, onError); })();
(async function() { console.log('httpPost'); await help.httpPost(help.httpPostableObject({ name:'test-taco' }), help.httpDefaultOptions(), onComplete, onError); })();
(async function() { console.log('httpGet'); await help.httpGet('http://admin:password@127.0.0.1:5984/', onComplete, onError, onChunk); })();

( function() { console.log('uuid:', help.uuid()); } )();
( function(obj) { console.log('clone', obj.clone()); } )({ success: true });
( function(obj) { console.log('objEach', obj.ea(function (e, i, n) { this[n] = e * 2; }) ); } )({ one: 1, two: 2 });
( function(arr) { console.log('arrayEach', arr.ea(function(e, i, n) { this[n] = e * 2; }) ); } )([1, 2, 3]);

let couch = require('./couch.js')
(async function() { console.log('couchGet'); await couch.get('http://admin:password@127.0.0.1:5984/musiikki', onComplete, onError, onChunk); })();
(async function() { console.log('couchPut'); await couch.put('http://admin:password@127.0.0.1:5984/', onComplete, onError, onChunk); })();
(async function() { console.log('couchPost'); await couch.post('http://admin:password@127.0.0.1:5984/', onComplete, onError, onChunk); })();
/**/
(async function() { console.log('couchSave'); await couch.list('todo', onComplete, onError); })();
(async function() { console.log('couchSave'); await couch.load('todo', onComplete, onError); })();
(async function() { console.log('couchSave'); await couch.save('todo', onComplete, onError); })();
(async function() { console.log('couchClone'); await couch.clone('todo', onComplete, onError); })();
(async function() { console.log('couchDelete'); await couch.delete('todo', onComplete, onError); })();
(async function() { console.log('couchSuspend'); await couch.suspend('todo', onComplete, onError); })();
(async function() { console.log('couchActivate'); await couch.activate('todo', onComplete, onError); })();
(async function() { console.log('couchPublish'); await couch.publish('todo', onComplete, onError); })();

let db = require('db.js')
(async function() { console.log('dbQuery'); await db.save('todo', onComplete, onError); })();
(async function() { console.log('dbGetStatus'); await db.('todo', onComplete, onError); })();
(async function() { console.log('dbGet'); await db.('todo', onComplete, onError); })();
(async function() { console.log('dbPost'); await db.('todo', onComplete, onError); })();
(async function() { console.log('dbPut'); await db.('todo', onComplete, onError); })();
(async function() { console.log('dbSave'); await db.('todo', onComplete, onError); })();
(async function() { console.log('dbClone'); await db.('todo', onComplete, onError); })();
(async function() { console.log('dbDelete'); await db.('todo', onComplete, onError); })();
(async function() { console.log('dbSuspend'); await db.('todo', onComplete, onError); })();
(async function() { console.log('dbActivate'); await db.('todo', onComplete, onError); })();
(async function() { console.log('dbPublish'); await db.('todo', onComplete, onError); })();
(async function() { console.log('dbUnPublish'); await db.('todo', onComplete, onError); })();

let pages = require('pages.js')
(async function() { console.log('pages'); await pages.loadById('ID', onComplete, onError); })();
(async function() { console.log('pages'); await pages.loadByName('ID', onComplete, onError); })();
(async function() { console.log('pages'); await pages.getHTML('todo', onComplete, onError); })();
(async function() { console.log('pages'); await page.save('todo', onComplete, onError); })();
(async function() { console.log('pages'); await page.update('todo', onComplete, onError); })();
