"use strict";


/**
 *
 * @param {String} name a string representation of the note
 * @param {Number} frequency in Hertz
 * @param {Number} duration in base units of time
 * @constructor
 */
function Note(name, frequency, duration) {
    this.name = name;
    this.frequency = frequency;
    this.duration = duration;
}

/**
 * Whether this is a rest (pause) instead of an actual note.
 * @returns {boolean}
 */
Note.prototype.isRest = function () {
    return typeof(this.frequency) == 'boolean' && !this.frequency;
};

Note.prototype.getFrequency = function () {
    return this.frequency;
};

Note.prototype.getDuration = function () {
    return this.duration;
};

Note.prototype.getName = function () {
    return this.name;
};

module.exports = Note;
