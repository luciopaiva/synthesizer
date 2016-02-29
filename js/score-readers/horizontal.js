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

HorizontalReader.prototype.parseHeader = function (lines, composition) {
    var
        lastHeaderline = -1;

    lines.some(function (line, lineIndex) {
        var
            key,
            value;

        line = line.replace(/\s+/g, '');  // remove all spaces, not just leading/trailing ones

        if (line === '---') {
            lastHeaderline = lineIndex;
            return true;
        }

        line = line.split('=');
        key = line[0];
        value = line[1];

        switch (key) {
            case 'BPM':
                composition.setBPM(parseInt(value, 10));
                break;
        }

        return false;
    });

    if (lastHeaderline == -1) {
        return lines;
    } else {
        return lines.slice(lastHeaderline + 1);
    }
};

/**
 * Map to trim a list of strings.
 *
 * @param {String} line line to be trimmed (will remove leading and trailing spaces)
 * @returns {void|string|XML}
 */
HorizontalReader.prototype.trim = function (line) {
    return line.replace(/^\s+|\s+$/g, '');
};

/**
 * Filter to remove comment lines.
 *
 * @param {String} line line to be processed
 * @returns {boolean} false if line is a comment
 */
HorizontalReader.prototype.removeComments = function (line) {
    return line.indexOf('#') != 0;
};

HorizontalReader.prototype.parse = function (rawScore) {
    var
        self = this,
        lines,
        startTime = 0,
        composition,
        instrument;

    composition = new Composition();

    // parser is case-insensitive
    lines = rawScore.toUpperCase()
        .split(/\n/)
        .map(self.trim.bind(self))
        .filter(self.removeComments.bind(self));

    // process the header and get back an array with the remaining lines
    lines = self.parseHeader(lines, composition);

    // for now we only have one hardcoded instrument
    instrument = new SineInstrument();

    lines.forEach(function (line) {
        var
            rawChords = line.split(/\s+/);

        rawChords.forEach(function (rawChord) {
            var
                minimumDuration,
                hasNote = false,
                rawNotes = rawChord.split(',');

            minimumDuration = rawNotes.reduce(function (minimumDurationSoFar, rawNote) {
                var
                    note = self.parseNote(rawNote, startTime, composition.getBaseNoteDuration());

                if (note !== null) {
                    instrument.addNote(note);

                    hasNote = true;

                    if (note.getDuration() < minimumDurationSoFar) {
                        return note.getDuration();
                    } else {
                        return minimumDurationSoFar;
                    }
                } else {
                    return minimumDurationSoFar;
                }
            }, Number.POSITIVE_INFINITY);

            if (hasNote) {
                // advance the minimum duration between notes in this latest chord
                startTime += minimumDuration;
            }
        });
    });

    composition.addInstrument(instrument);
    return composition;
};

module.exports = HorizontalReader;
