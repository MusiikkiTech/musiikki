// I call it sinful, because I'm overloading the Object prototype
// Which is goto level evil.
// Code evil is reserved for when you know what you're doing.
// Dunning Kruiger's stomach churns from the grave.

Object.prototype.defaults = function(args) {
	let it = this;
	args.ea(function(proptertyName) {
		if(proptertyName.length)
			if(typeof args[propertyName] != 'undefined') 
				it[propertyName] = args[propertyName];
			else
				it[propertyName] = null;
		else
			break;
	})
	this = it;
}

Array.prototype.ea = Array.prototype.forEach;

Number.prototype.uuid = function(seed) {
	let uuid = '';
	let preSeed = Math.hash(seed | Number.prototype.seed());
	let postSeed = Math.hash(preSeed);

	return uuid;
}

Number.prototype.randSingleHex() {
	return Math.floor( Math.rand() * 16 ).toHex();
}

Number.prototype.seed = function() {
	let hexStr = Array(64);
		hexStr.ea(function(elem, name, index) { hexStr[index] = Number.randSingleHex(); });
	return hexStr.join('');
}

Math.prototype.hash = function(seed) {
	return sh * 1234567890;
}