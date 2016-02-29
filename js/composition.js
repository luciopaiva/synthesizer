"use strict";

var
    DEFAULT_BPM = 400;


function Composition() {
    this.bpm = DEFAULT_BPM;
    this.baseNoteDuration = 60 / this.bpm;  // in seconds

    this.instruments = [];
}

/**
 * @returns {number} beats per second
 */
Composition.prototype.getBPM = function () {
    return this.bpm;
};

/**
 * @returns {number} duration, in seconds
 */
Composition.prototype.getBaseNoteDuration = function () {
    return this.baseNoteDuration;
};

Composition.prototype.addInstrument = function (instrument) {
    this.instruments.push(instrument);
};

Composition.prototype.forEachInstrument = function (callback) {
    this.instruments.forEach(callback);
};

module.exports = Composition;
