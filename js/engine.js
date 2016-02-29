"use strict";


function Engine() {
    // initialize Web Audio API context
    this.context = new window.AudioContext();

    // create master volume node
    this.masterVolume = this.context.createGain();
    this.masterVolume.gain.value = 1;
    //console.info('Master volume gain set at ' + this.masterVolume.gain.value);

    // connect master volume node to the speaker
    this.masterVolume.connect(this.context.destination);
}

Engine.prototype.getContext = function () {
    return this.context;
};

/**
 * Clipping is a known problem when switching audio frequencies or when abruptly coming in or out of a silence. We
 * prevent it by ramping up (during attack) and down (during release) the volume of the note.
 *
 * @param {AudioNode} node an instance of an AudioNode to be enveloped
 * @param startTime
 * @param stopTime
 * @param rampDuration
 */
Engine.prototype.getAntiClippingEnvelope = function (node, startTime, stopTime, rampDuration) {
    var
        envelope;

    envelope = this.context.createGain();
    envelope.gain.setValueAtTime(0, startTime);
    envelope.gain.linearRampToValueAtTime(1, startTime + rampDuration);
    envelope.gain.setValueAtTime(1, stopTime - rampDuration);
    envelope.gain.linearRampToValueAtTime(0, stopTime);

    node.connect(envelope);
    envelope.connect(this.masterVolume);

    return envelope;
};

/**
 * Plays a composition object.
 *
 * @param {Composition} composition
 */
Engine.prototype.play = function (composition) {
    var
        self = this,
        baseDuration = composition.getBaseNoteDuration(),
        noteClearanceGap = baseDuration * .05,
        rampDuration = baseDuration * 0.01,
        startTime = this.context.currentTime;

    composition.forEachInstrument(iterateInstrument);

    /**
     * @param {Instrument} instrument
     * @param {Note} note
     */
    function iterateNote(instrument, note) {
        var
            durationInSeconds = note.getDuration() * baseDuration,
            stopTime = startTime + durationInSeconds - noteClearanceGap,
            node;

        if (!note.isRest()) {
            node = instrument.generateAudioNote(self, note, startTime, stopTime);
            // this step is optional, but avoid clipping due to abrupt silences
            node = self.getAntiClippingEnvelope(node, startTime, stopTime, rampDuration);
            node.connect(self.masterVolume);
        }

        startTime += durationInSeconds;
    }

    /**
     * @param {Instrument} instrument
     */
    function iterateInstrument(instrument) {
        instrument.forEachNote(iterateNote.bind(self, instrument));
    }
};

module.exports = Engine;
