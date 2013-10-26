/**
 * @file dice.js
 * Test of the dice utils.
 */

var MFZ;
MFZ = require('../mfz.utils.js');

console.log('rolling two d6.');
var my2d6 = MFZ.dice.rollNdX(2); // rollNdX defaults to 6-sided dice.
console.log(my2d6);

console.log('rolling one d8.');
var my1d8 = MFZ.dice.rollNdX(1, 8);
console.log(my1d8);

console.log('Aggregated attack rolls (2d6 + 1d8).');
var myAttackRoll = [];
myAttackRoll = myAttackRoll.concat(my2d6, my1d8);
console.log(myAttackRoll);

console.log('Final attack value.');
var myAttackValue = MFZ.dice.getResult(myAttackRoll);
console.log(myAttackValue);
