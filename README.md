
# Development

This project uses browserify to modularize Javasript code, just like a Node.js project. In order to do that, browserify
needs to parse the code and turn it into a single file. Anyway, you will need to install it:

    npm install -g browserify watchify

`watchify` is needed to automate `browserify` builds upon code change. You may need to `sudo` the command above.

And then you simply run:

    npm run watch

And start coding.

# Features

* be able to define new timbres and save them as instruments
* instantiate an instrument
* sweep from note A to B
* tremolo (change in volume)
* vibrato (change in pitch)

# Example code

## Time passes horizontally

First try at defining a language:

    # Mario Bros Theme
    e5.1  e5.1  . e5.1  | . c5.1  e5.1  . | g5.1 . . . | g4
    fs4.1 fs4.1   fs4.1 |   fs4.1 fs4.1   | b4.1
                                            g4.1

Where `e5`, `fs4` (aka `f#4`), `c5`, etc, are notes with their respective octave. Then comes a `.1` meaning the note is meant to
last for 1 unit of time. The unit of time will be defined by how many BPM (beats per minute) we configured the player to
play. If we have 120 BPM, each unit of time lasts for 1/120 of a minute, or `60 * 1/120 seconds` = `0.5 second`.

For notes of a single unit of duration, you don't need to write `.1`:

    # Mario Bros Theme
    e5  e5  . e5  | . c5  e5  . | g5 . . .
    fs4 fs4   fs4 |   fs4 fs4   | b4
                                            g4.1
Furthermore, a dot means a rest. If the dot is alone, it means a rest lasting a single unit of time. If the dot comes
with a number, that number designates how many units of time the rest will take. Another possibility is to add as many
dots as there are units to rest. You should separate those dots with spaces to improve readability.

Notes that are aligned across lines are meant to be played together. Thus, if you're going to play N notes at once, you
will have to use N lines for that.

## Time passes vertically

A second possibility:

    e5 fs4
    e5 fs4
    .
    e5 fs4
    --------------
    .
    c5 fs4
    e5 fs4
    .
    --------------
    g5 b4 g4
    .
    .
    .
    --------------

In this approach, each line represents a single unit of time, containing all notes meant to be played together.

If you want a note to last for more than one unit of time:

    e5 fs4
    =  fs4

Here, `e5` will last for 2 units, while `fs4` will be played two times, each with a duration of a single unit. Those
cases are different from each other, because the player emulates ADSR envelopes (attack/decay/sustain/release), so the
listener will hear the difference between them (`fs4` will be attacked twice while `e5` will sustain for longer).

A slide could be represented like this:

    c5/ fs4
    e5  =

A vibrato sustained for 2 units:

    c5~ fs4
    =~

A tremolo:

    c5"



