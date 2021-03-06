"use strict";

function Instrument()  {
    this.notes = [];
    /** how many notes can be played simultaneously with this instrument - used to avoid clipping */
    this.maxSimultaneousNotes = 6;
}

Instrument.prototype.addNote = function (note) {
    if (!!note) {
        this.notes.push(note);
    }
};

Instrument.prototype.forEachNote = function (callback) {
    this.notes.forEach(callback);
};

/**
 * @param {Engine} engine
 * @param {Note} note
 * @param {Number} startTime moment in time when note starts
 * @param {Number} stopTime moment in time when note stops
 */
Instrument.prototype.generateAudioNote = function (engine, note, startTime, stopTime) {
    throw new Error('Must implement me in a subclass!');
};

module.exports = Instrument;
