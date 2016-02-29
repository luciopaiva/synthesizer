"use strict";

var
    inherits = require('inherits');

var
    Composition = require('../composition'),
    SineInstrument = require('../instruments/sine'),
    ScoreReader = require('../score-reader');


function HorizontalReader() {
    ScoreReader.call(this);
}

inherits(HorizontalReader, ScoreReader);

HorizontalReader.prototype.parse = function (rawScore) {
    var
        self = this,
        composition,
        instrument;

    instrument = new SineInstrument();

    rawScore = rawScore.toUpperCase().split(/\s+/);
    rawScore.forEach(function (rawNote) {
        var
            note = self.parseNote(rawNote);
        instrument.addNote(note);
    });

    composition = new Composition();
    composition.addInstrument(instrument);
    return composition;
};

module.exports = HorizontalReader;
