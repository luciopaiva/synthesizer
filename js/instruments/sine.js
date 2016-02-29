"use strict";

var
    Instrument = require('../instrument'),
    inherits = require('inherits');


function SineInstrument() {
    Instrument.call(this);
}

inherits(SineInstrument, Instrument);

/**
 * @param {Engine} engine
 * @param {Note} note
 * @param {Number} startTime moment in time when note starts
 * @param {Number} stopTime moment in time when note stops
 */
Instrument.prototype.generateAudioNote = function (engine, note, startTime, stopTime) {
    var
        gainReduction,
        oscillator;

    if (note.isRest()) return;

    oscillator = engine.getContext().createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = note.getFrequency();

    oscillator.start(startTime);
    oscillator.stop(stopTime);

    gainReduction = engine.getContext().createGain();
    gainReduction.gain.value = 1 / this.maxSimultaneousNotes;
    oscillator.connect(gainReduction);


    return gainReduction;
};

module.exports = SineInstrument;
