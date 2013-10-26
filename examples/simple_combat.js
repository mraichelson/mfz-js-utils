/**
 * @file simple_combat.js
 */

var MFZ;
MFZ = require('../mfz.utils.js');

/**
 * Assumption: Two frames both with a standard "soldier" loadout.
 * Assumption: Each frame is attacking the opposite and a different
 *   frame has applied a spotting die to them (with the value 
 *   rolled below).
 * Ignore wild dice for the moment.
 */
var attacker, defender, useDamageChart;
attacker = {
  red : MFZ.dice.getResult(MFZ.dice.rollNdX(2)),
  blue : MFZ.dice.getResult(MFZ.dice.rollNdX(1)),
  yellow : MFZ.dice.getResult(MFZ.dice.rollNdX(1)),
  green : MFZ.dice.getResult(MFZ.dice.rollNdX(1))
};
defender = {
  red : MFZ.dice.getResult(MFZ.dice.rollNdX(2)),
  blue : MFZ.dice.getResult(MFZ.dice.rollNdX(1)),
  yellow : MFZ.dice.getResult(MFZ.dice.rollNdX(1)),
  green : MFZ.dice.getResult(MFZ.dice.rollNdX(1))
};
useDamageChart = 'standard'; // which damage chart to use.

console.log('Attacker');
console.log(attacker);
console.log('Defender');
console.log(defender);
console.log('----');

console.log('Resolving initial attack...');
if (attacker.red + attacker.yellow > defender.blue) {
  console.log('Attacker: Attack successful');
  var damageResult = MFZ.dice.rollDamage(attacker.red + attacker.yellow - defender.blue, useDamageChart);
  console.log('Damage result: ' + damageResult);
}
else {
  console.log('Attacker: Attack failed.');
}

console.log('Resolving retaliatory attack...');
if (defender.red + defender.yellow > attacker.blue) {
  console.log('Defender: Attack successful');
  var damageResult = MFZ.dice.rollDamage(defender.red + defender.yellow - attacker.blue, useDamageChart);
  console.log('Damage result: ' + damageResult);
}
else {
  console.log('Defender: Attack failed.')
}
