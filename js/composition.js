"use strict";

var
    DEFAULT_BPM = 400;


function Composition() {
    this.bpm = DEFAULT_BPM;
    this.baseNoteDuration = null;
    this.instruments = [];

    this.recalculateBaseNoteDuration();
}

/**
 * @returns {number} beats per second
 */
Composition.prototype.getBPM = function () {
    return this.bpm;
};

Composition.prototype.setBPM = function (bpm) {
    this.bpm = bpm;
    this.recalculateBaseNoteDuration();
};

Composition.prototype.recalculateBaseNoteDuration = function () {
    this.baseNoteDuration = 60 / this.bpm;  // in seconds
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
