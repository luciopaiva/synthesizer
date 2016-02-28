"use strict";

var
    Notes = require('./notes');


function Engine() {
    // initialize Web Audio API context
    this.context = new window.AudioContext();

    // create master volume node
    this.masterVolume = this.context.createGain();
    console.info('Master volume gain set at ' + this.masterVolume.gain.value);

    // connect master volume node to the speaker
    this.masterVolume.connect(this.context.destination);
}

Engine.prototype.createOscillator = function (frequency) {
    var
        osc = this.context.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = frequency;
    osc.connect(this.masterVolume);
    return osc;
};

Engine.prototype.parseNote = function (rawNote) {
    var
        self = this,
        frequency = Notes[rawNote];

    if (typeof(frequency) == 'number') {
        return self.createOscillator(frequency);
    }
};

Engine.prototype.parseScore = function (rawScore) {
    var
        result = [],
        self = this,
        score = rawScore.toUpperCase().split(/\s+/);

    score.forEach(function (note) {
        result.push(self.parseNote(note));
    });

    return result;
};

Engine.prototype.play = function (score) {
    var
        startTime = this.context.currentTime,
        noteDuration = 0.2,
        processedNotes = this.parseScore(score);

    processedNotes.forEach(function (note) {
        note.start(startTime);
        note.stop(startTime + noteDuration);
        startTime += noteDuration;
    });
};

module.exports = Engine;
