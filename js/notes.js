"use strict";

var
    FIRST_BASE_NOTE = 27.5,  // A0
    TET_POWER = 1/12,  // twelve-tone equal temperament power
    TET_FACTOR = Math.pow(2, TET_POWER),
    NOTE_SYMBOLS = 'A,A#,B,C,C#,D,D#,E,F,F#,G,G#'.split(',');

function intervalToFrequency(baseNote, interval) {
    // The initial implementation had a fixed `basedNote` (A0), but it looks like there's a little drift due to lack of
    // resolution as you calculate notes at higher octaves. To compensate that, I decided to pass `baseNote` as the
    // first note of each octave.
    //
    // For instance, in the second octave, this is the error:
    // > Math.pow(Math.pow(2, 1/12), 12 * 2) - Math.pow(Math.pow(2, 12/12), 2)
    // 8.881784197001252e-16
    return baseNote * Math.pow(TET_FACTOR, interval);
}

function generateFrequencies() {
    var
        numOctaves = 8,
        octaveIndex = 0,
        numSemiTones = NOTE_SYMBOLS.length,
        semiToneIndex,
        noteName,
        noteFrequency,
        baseNote = FIRST_BASE_NOTE,
        result = {};

    while (octaveIndex < numOctaves) {
        baseNote = FIRST_BASE_NOTE * Math.pow(2, octaveIndex);
        for (semiToneIndex = 0; semiToneIndex < numSemiTones; semiToneIndex++) {
            if (semiToneIndex == 3) {  // just passed to the next octave (B -> C)
                octaveIndex++;
            }
            noteName = NOTE_SYMBOLS[semiToneIndex] + octaveIndex;
            noteFrequency = intervalToFrequency(baseNote, semiToneIndex);
            result[noteName] = noteFrequency;
            console.info(noteName + ': ' + noteFrequency);
        }
    }

    return result;
}

module.exports = generateFrequencies();
