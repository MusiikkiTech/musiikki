let config = require('./config.js').exports;
let helpers = require('./helpers.js');
let help = new helpers.exports(config);
let couchDB = require('./couch.js');
let couch = new couchDB.exports(config);

let onComplete = function(results) { console.log('complete', results) }
let onChunk = function(results) { console.log('chunk', results) }
let onError = function(results) { console.log('error', results) }

// MAIN
async function main() {
  console.log('config', config) 
  console.log('shell'); help.shell('echo shell success', onComplete, onError);
  console.log('curl'); await help.curl('http://admin:password@127.0.0.1:5984', onComplete, onError); 

/*
  let obj = { id: '7a56a5c47bfd269a26f868b2c30006c5', name: 'helloworld' };
  console.log('httpGet', help.httpGet(help.httpDefaultOptions('GET', ''), onComplete, onError));
  console.log('httpGet', help.httpGet(help.httpDefaultOptions('GET', '7a56a5c47bfd269a26f868b2c30006c5'), onComplete, onError));
  console.log('httpQuery', help.httpQuery('7a56a5c47bfd269a26f868b2c30006c5', onComplete, onError));
  console.log('httpPost', help.httpPost(obj, onComplete, onError));
*/
/*
  let obj = { id: help.uuid(), name: 'hellokjfjhkworld', type:'hotdog' };
  console.log('couch save', await couch.save(obj, onComplete, onError));
  console.log('couch get', await couch.load(obj, onComplete, onError));

  let obj2 = { id: help.uuid(), name: 'helkjhfdloworld', type:'nothotdog' };
  console.log('couch save', await couch.save(obj2, onComplete, onError));
  console.log('couch get', await couch.load(obj2, onComplete, onError));
*/
  console.log('create view', await couch.createView('views3')); 
  console.log('use view', await couch.view('views3/hotdog', (result) => {console.log('VIEWZ', result);}));
  
  //console.log('couch get', couch.load(obj));
 // await help.httpGet(help.httpDefaultOptions({ requestString:'/musiikki' }, obj), onComplete, onError);
/**/
/*
(async function() { console.log('httpPost'); await help.httpPost(help.httpPostableObject({ name:'test-taco' }), help.httpDefaultOptions(), onComplete, onError); })();
(async function() { console.log('httpGet'); await help.httpGet('http://admin:password@127.0.0.1:5984/', onComplete, onError, onChunk); })();

  console.log('uuid:', help.uuid());
*/
/*
let couch = require('./couch.js')
(async function() { console.log('couchGet'); await couch.get('http://admin:password@127.0.0.1:5984/musiikki', onComplete, onError, onChunk); })();
(async function() { console.log('couchPut'); await couch.put('http://admin:password@127.0.0.1:5984/', onComplete, onError, onChunk); })();
(async function() { console.log('couchPost'); await couch.post('http://admin:password@127.0.0.1:5984/', onComplete, onError, onChunk); })();
/**/

/*
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
/**/

}; main();
