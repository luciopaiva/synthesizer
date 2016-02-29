"use strict";


/**
 *
 * @param {String} name a string representation of the note
 * @param {Number|Boolean} frequency in Hertz or `false` in case of a rest
 * @param {Number} startTime time, in seconds, since the first note was played
 * @param {Number} duration in seconds
 * @constructor
 */
function Note(name, frequency, startTime, duration) {
    this.name = name;
    this.frequency = frequency;
    this.startTime = startTime;
    this.duration = duration;
}

/**
 * Whether this is a rest (pause) instead of an actual note.
 * @returns {boolean}
 */
Note.prototype.isRest = function () {
    return typeof(this.frequency) == 'boolean' && !this.frequency;
};

Note.prototype.getName = function () {
    return this.name;
};

Note.prototype.getFrequency = function () {
    return this.frequency;
};

Note.prototype.getStartTime = function () {
    return this.startTime;
};

Note.prototype.getDuration = function () {
    return this.duration;
};

module.exports = Note;
