ctr = 0;
x = 1;
e = 2.71828;
phi = 1.618033988749894848204586834;
while( x < 2**100 ) {
	console.log(ctr, x)
	x = x * phi;
	ctr++;
}

// phi
> []['toString'][['']]()

// e
1 2.71828
2 7.3890461584
3 20.085496391455553
4 54.5980031309658
5 148.41265995084171
6 403.427165291174
7 1096.6279948676925
8 2980.941945888951
9 8103.034872671018
10 22026.317633684175
11 59873.69869729102
12 162753.47769487224
13 442409.5233484173
14 1202592.9591275358
15 3268984.388937198
16 8886014.884760207
17 24154676.540945973
18 65659174.147722624
19 178480019.90227145
20 485158668.4999464

let complx = ['']
Array.prototype[['']].i = function(n) { return { 'i' , n }} 

Array.prototype.ea = Array.prototype.forEach;
let list = Object.getOwnPropertyNames(Array.prototype)
list.ea(function(elem, inx) { 
	let sublist = Object.getOwnPropertyNames(Array.prototype[elem]);
	sublist.ea(function (elemSub, inxSub) {
		let subsublist = Object.getOwnPropertyNames(Array.prototype[elem][elemSub]);
	 	console.log(inx, elem, inxSub, elemSub, Array.prototype[elem][elemSub]);

	    subsublist.ea(function (el, ind) {
	    	console.log(3, el, ind, Array.prototype[elem][elemSub][el] );
	    })	 	
    });
});
