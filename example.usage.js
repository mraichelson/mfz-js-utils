/**
 * @file example.usage.js
 * A procedural example of using the mfz.utils.js utilities.
 */

/**
 * Demonstrate the use case of a frame with 2Rx+1d8Rx vs a frame with 1B
 */

var my2d6 = MFZ.dice.rollNdX(2, 6); // 2d6
var my1d8 = MFZ.dice.rollNdX(1, 8); // 1d8
var myAttackRoll = [];
myAttackRoll = myAttackRoll.concat(my2d6, my1d8);
console.log('attack dice = ' + myAttackRoll);
var myAttackValue = MFZ.dice.getResult(myAttackRoll);
console.log('attack value = ' + myAttackValue);

var yourDefenseRoll = MFZ.dice.rollNdX(1); // 1d6
var yourDefenseValue = MFZ.dice.getResult(yourDefenseRoll);
console.log('defense value = ' + yourDefenseValue);

if (myAttackValue > yourDefenseValue) {
  var myDamageDice = myAttackValue - yourDefenseValue;
  console.log('rolling ' + myDamageDice + ' damage dice.');
  var myDamageResult = MFZ.dice.rollDamage(myDamageDice, 'cover');
  console.log('damage results = ' + myDamageResult);
}
else {
  console.log('defender succeded, no damage done.');
}