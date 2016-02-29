/**
 * The score reader is responsible for interpreting a text input file and converting it into a proper Score object with
 * objects that the engine can understand.
 *
 * The purpose of this architecture is to guarantee that the engine is input agnostic, so we can have multiple input
 * languages while using the same engine to play them.
 */
"use strict";

var
    Notes = require('./notes'),
    Note = require('./note');


function ScoreReader() {
}

ScoreReader.prototype.parseNote = function (rawNote, startTime, baseDuration) {
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

    return new Note(noteName, frequency, startTime, noteDuration * baseDuration);
};

ScoreReader.prototype.parse = function (rawScore) {
    throw new Error('Must implement me in a subclass!');
};

module.exports = ScoreReader;
