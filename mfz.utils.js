/**
 * @file mfz.utils.js
 * Utilities for commonly performed tasks in a 
 * Mobile Frame Zero game.
 */

/**
 * Global MFZ object for attaching utilities to.
 */
var MFZ = {};

/**
 * Shared configuration settings.
 */
MFZ.conf = {
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
MFZ.strings = {
  // damage result descriptions
  damage : {
    cover : 'Attack damaged cover.',
    frame : 'Attack damaged frame.',
    none  : 'Attack did no damage.'
  }
};

/**
 * Tools for handling the dice used in the an MFZ game.
 */
MFZ.dice = {
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
    damageChart = MFZ.charts.damage(chart);
    rolls = MFZ.dice.rollNdX(dice, 6);
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
MFZ.charts = {
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
        outcomes[1] = 'no result';
        outcomes[2] = 'no result';
        outcomes[3] = 'no result';
        outcomes[4] = 'no result';
        outcomes[5] = 'damage';
        outcomes[6] = 'damage';
      break;
      case 'cover':
        outcomes[1] = 'no result';
        outcomes[2] = 'no result';
        outcomes[3] = 'no result';
        outcomes[4] = 'cover';
        outcomes[5] = 'cover';
        outcomes[6] = 'damage';
      break;
      case 'melee':
        outcomes[1] = 'no result';
        outcomes[2] = 'no result';
        outcomes[3] = 'no result';
        outcomes[4] = 'damage';
        outcomes[5] = 'damage';
        outcomes[6] = 'damage';
      break;
    }
    return outcomes;
  }
};
