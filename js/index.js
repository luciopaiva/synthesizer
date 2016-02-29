"use strict";

var
    d3 = require('d3');

var
    ScoreReader = require('./score-reader'),
    Engine = require('./engine');

var
    engine = new Engine();


d3.text('scores/mario.scr', function (err, data) {
    var
        composition = ScoreReader.parse(data);

    engine.play(composition);
});

/*

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
//var noiseButton = document.querySelector('#noise');
var toneButton = document.querySelector('#tone');
var isTonePlaying = false;
var lastTimestamp;

//var channels = 2;
//var frameCount = audioCtx.sampleRate * 2.0;
//var myArrayBuffer = audioCtx.createBuffer(2, frameCount, audioCtx.sampleRate);
//noiseButton.onclick = function() {
//    // Fill the buffer with white noise;
//    //just random values between -1.0 and 1.0
//    for (var channel = 0; channel < channels; channel++) {
//        // This gives us the actual ArrayBuffer that contains the data
//        var nowBuffering = myArrayBuffer.getChannelData(channel);
//        for (var i = 0; i < frameCount; i++) {
//            // Math.random() is in [0; 1.0]
//            // audio needs to be in [-1.0; 1.0]
//            nowBuffering[i] = Math.random() * 2 - 1;
//        }
//    }
//
//    // Get an AudioBufferSourceNode.
//    // This is the AudioNode to use when we want to play an AudioBuffer
//    var source = audioCtx.createBufferSource();
//    // set the buffer in the AudioBufferSourceNode
//    source.buffer = myArrayBuffer;
//    //source.loop = true;
//    // connect the AudioBufferSourceNode to the
//    // destination so we can hear the sound
//    source.connect(audioCtx.destination);
//    // start the source playing
//    source.start();
//};

var durationInSeconds = 2;
var durationInSamples = audioCtx.sampleRate * durationInSeconds;
var numChannels = 1;
var toneBuffer = audioCtx.createBuffer(numChannels, durationInSamples, audioCtx.sampleRate);
var bufferSource = audioCtx.createBufferSource();

toneButton.onclick = function () {
    if (isTonePlaying) {
        bufferSource.stop();
    }
    var i;

    var soundData = toneBuffer.getChannelData(0);
    for (i = 0; i < soundData.length; i++) {
        soundData[i] = Math.sin(2 * Math.PI * i * 440 / audioCtx.sampleRate);
    }

    lastTimestamp = audioCtx.currentTime;

    bufferSource.buffer = toneBuffer;
    bufferSource.connect(audioCtx.destination);
    bufferSource.start(lastTimestamp);

    setTimeout(function () {
        var secondSource = audioCtx.createBufferSource();
        var secondBuffer = audioCtx.createBuffer(numChannels, durationInSamples, audioCtx.sampleRate);

        var soundData = secondBuffer.getChannelData(0);
        for (i = 0; i < soundData.length; i++) {
            soundData[i] = Math.sin(2 * Math.PI * i * 220 / audioCtx.sampleRate);
        }

        secondSource.buffer = secondBuffer;
        secondSource.connect(audioCtx.destination);
        secondSource.start(lastTimestamp + 2);
    }, 100);
};

setInterval(function () {
    //console.info(audioCtx.currentTime);
    //console.info(audioCtx.currentTime);
}, 100);
*/
