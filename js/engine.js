"use strict";

var
    Notes = require('./notes');

var
    DEFAULT_BPM = 180;


function Engine() {
    this.bpm = DEFAULT_BPM;
    this.noteDuration = 60 / this.bpm;  // in seconds

    // initialize Web Audio API context
    this.context = new window.AudioContext();

    // create master volume node
    this.masterVolume = this.context.createGain();
    this.masterVolume.gain.value = 0.4;
    console.info('Master volume gain set at ' + this.masterVolume.gain.value);

    // connect master volume node to the speaker
    this.masterVolume.connect(this.context.destination);
}

Engine.prototype.createOscillator = function (frequency) {
    var
        osc;

    osc = this.context.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = frequency;

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
        self = this,
        startTime = this.context.currentTime,
        processedNotes = this.parseScore(score);

    processedNotes.forEach(function (note) {
        var
            stopTime = startTime + self.noteDuration * .95,
            gain;

        // Clipping is a known problem when switching audio frequencies. We prevent it by ramping up (during attack) and
        // down (during release) the volume of the note:
        gain = self.context.createGain();
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(1, startTime + self.noteDuration * 0.01);
        gain.gain.setValueAtTime(1, stopTime - self.noteDuration * 0.01);
        gain.gain.linearRampToValueAtTime(0, stopTime);
        gain.connect(self.masterVolume);

        note.connect(gain);
        //note.connect(self.masterVolume);
        note.start(startTime);
        note.stop(stopTime);

        startTime += self.noteDuration;
    });
};

module.exports = Engine;
