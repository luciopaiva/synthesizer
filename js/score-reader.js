/**
 * The score reader is responsible for interpreting a text input file and converting it into a proper Score object with
 * objects that the engine can understand.
 *
 * The purpose of this architecture is to guarantee that the engine is input agnostic, so we can have multiple input
 * languages while using the same engine to play them.
 */
"use strict";

var
    Composition = require('./composition'),
    SineInstrument = require('./instruments/sine'),
    Notes = require('./notes'),
    Note = require('./note');


function parseNote(rawNote) {
    var
        noteName,
        noteDuration,
        hasNote,
        hasDuration,
        frequency = false;

    if (rawNote === '|') {
        return null;
    }

    rawNote = rawNote.split('.');

    hasNote = rawNote[0].length > 0;
    if (hasNote) {
        noteName = rawNote[0];
        frequency = Notes[noteName];
        if (typeof(frequency) != 'number') {
            throw new Error('Invalid note "' + noteName + '"');
        }
    }

    hasDuration = rawNote.length > 1 && !isNaN(parseInt(rawNote[1]));
    noteDuration = hasDuration ? parseInt(rawNote[1]) : 1;

    return new Note(noteName, frequency, noteDuration);
}

function parseScore(rawScore) {
    var
        composition,
        instrument;

    instrument = new SineInstrument();

    rawScore = rawScore.toUpperCase().split(/\s+/);
    rawScore.forEach(function (rawNote) {
        var
            note = parseNote(rawNote);
        instrument.addNote(note);
    });

    composition = new Composition();
    composition.addInstrument(instrument);
    return composition;
}

module.exports = {
    parse: parseScore
};
