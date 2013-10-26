/**
 * @file mfz.utils.js
 * Utilities for commonly performed tasks in a 
 * Mobile Frame Zero game.
 */

/**
 * Shared configuration settings.
 */
exports.conf = {
  // Standard values used for scoring.
  score : {
    assetBase     : 5, // Score Per Asset base.
    spaModSystems : 1, // SPA modifier (+/-) for # of systems.
    spaModFrames  : 1, // SPA modifier (+/-) for # of frames.
  }
};

/**
 * Strings of text (so they can be replaced globally).
 */
exports.strings = {
  // damage result descriptions
  damage : {
    cover : 'Attack damaged cover.',
    frame : 'Attack damaged frame.',
    none  : 'Attack did no damage.'
  },
  // system effect descriptions
  system : {
    blue : [
      'Must use wild dice for defense.',
      'Receives one Blue die for defense.',
      'Receives two Blue dice for defense. May act as cover to other frames without taking damage.'
    ],
    green : [
      'Must use wild dice for movement.',
      'Receives one Green die for movement. May move through cover.',
      'Receives two Green dice for movement. May move through cover.'
    ],
    red : [
      'Must use wild dice for attacks. May only attack targets in melee range.',
      'Receives two red dice against targets at the specified range.',
      'Receives two red dice and one red d8 against targets at the specified range.'
    ],
    yellow : [
      'Must use wild dice for spotting. May not spot targets in cover. May only spot targets in direct-fire range.',
      'Receives one Yellow die for spotting. May spot targets in cover in direct-fire range.',
      'Receives two Yellow dice for spotting. May spot targets in cover with no range restriction.'
    ]
  }
};

/**
 * Tools for handling the dice used in the an MFZ game.
 */
exports.dice = {
  /**
   * Rolls N dice with X sides (NdX)
   *
   * @param n (required)
   *   The number of dice to roll.
   * @param x (optional)
   *   The number of sides on the dice.
   *   Defaults to 6.
   * @returns an array of number values.
   */
  rollNdX : function(n, x) {
    x = (typeof x === "undefined") ? 6 : x;
    var results;
    results = [];
    for (var i = 0; i < n; i++) {
      results.push(Math.floor((Math.random() * x) + 1));
    }
    return results;
  },

  /**
   * For an array of numerical values return the highest result.
   *
   * @param results (required)
   *   an array of (whole) numbers
   * @returns
   *   the highest value from the results array that was input.
   */
  getResult : function(results) {
    return Math.max.apply(Math, results);
  },

  /**
   * Return damage results.
   * 
   * @param dice (required)
   *   the number of damage dice to be rolled.
   * @param chart (required)
   *   the damage chart to be used.
   * @returns
   *   an array of strings describing the results of each
   *   damage die for attacks using that chart.
   */
  rollDamage : function(dice, chart) {
    var damageChart, rolls, results;
    damageChart = exports.charts.damage(chart);
    rolls = exports.dice.rollNdX(dice, 6);
    results = [];
    rolls.forEach(function(roll) {
      results.push(damageChart[roll]);
    });
    return results;
  }

  //@DISCUSS: Should there just be a single roll() function that
  // takes an string as the dice to roll?
  // calculateAttack = MFZ.dice.roll('2d6');

  //@DISCUSS: Should a single roll() function be able to take grouped
  // dice of different types?
  // calculateAttack = MFZ.dice.roll('2d6 1d8');
};

/**
 * Charts used in the process of playing the game.
 */
exports.charts = {
  /**
   * Damage roll result charts.
   *
   * @param chart (required)
   *   The name of the chart to be referenced:
   *   "standard", "cover" or "melee"
   * @returns
   *   an associative array of results for a damage chart
   *   from the MFZ rule book.
   */
  damage : function(chart) {
    var outcomes;
    outcomes = [];
    switch(chart) {
      case 'standard':
        outcomes[1] = 'none';
        outcomes[2] = 'none';
        outcomes[3] = 'none';
        outcomes[4] = 'none';
        outcomes[5] = 'frame';
        outcomes[6] = 'frame';
      break;
      case 'cover':
        outcomes[1] = 'none';
        outcomes[2] = 'none';
        outcomes[3] = 'none';
        outcomes[4] = 'cover';
        outcomes[5] = 'cover';
        outcomes[6] = 'frame';
      break;
      case 'melee':
        outcomes[1] = 'none';
        outcomes[2] = 'none';
        outcomes[3] = 'none';
        outcomes[4] = 'frame';
        outcomes[5] = 'frame';
        outcomes[6] = 'frame';
      break;
    }
    return outcomes;
  }
};
