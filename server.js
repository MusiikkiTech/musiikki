const express = require('express');
const app = express();
const port = 80;

let config = require('config.js')
let help = require('helpers.js');
	help.globals.port = config.port | 5984;
	help.globals.host = config.host | '127.0.0.1';
	help.globals.dbName = config.dbName | 'musiikki';
	help.globals.stripeDisabled = true;// TODO: add to config when ready.
	help.globals.debugMode = true;// TODO: add to config when ready.

/********************************************************
 * Routes
 ********************************************************/ 
// TODO: Add routes for pages dynamically.
// Note: You may have to restart the server after addin a new page.
app.get('/', (req, res) => res.send('Hello World!'))

/********************************************************
 * Route Handlers
 ********************************************************/ 


/********************************************************
 * BIG START BUTTON
 ********************************************************/ 
app.listen(websitePort, () => console.log(`Example app listening on port ${port}!`))