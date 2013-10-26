/**
 * @file damage.js
 * A test of calculating damage against a target.
 */

var MFZ;
MFZ = require('../mfz.utils.js');

// hard code some values for the test.
var myAttackValue = 4;
var mySpotValue = 6;
var yourDefenseValue = 3;
var useDamageChart = 'cover';

console.log('Attack value: ' + myAttackValue);
console.log('Spot value: ' + mySpotValue);
console.log('Defense value: ' + yourDefenseValue);
console.log('Use damage chart: ' + useDamageChart);

var myDamageDice = myAttackValue + mySpotValue - yourDefenseValue;
console.log('Damage dice to roll: ' + myDamageDice);
var myDamageResults = MFZ.dice.rollDamage(myDamageDice, useDamageChart);
console.log('Damage results: ' + myDamageResults);
