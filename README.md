popcorn.compatible
==================

A Popcorn.js module for checking browser compatibility with fancypants plugins.

## Features

- Detect whether the browser supports Popcorn.js at all
- Determine whether the browser supports a given plugin
- Option to load a "fallback" plugin to replace any or all incompatible plugins

## What it's for

While many Popcorn plugins work on any "modern" browser, there is an opportunity to create plugins that use advanced features that are not available even the latest versions of certain browsers, such as WebGL or the Web Audio API. There are other more common features that would seem to be widely available but are not, like Flash support or the ability to play multiple media files on an iPad.

*popcorn.compatible* allows authors to detect those features to decide whether a Popcorn composition can be played at all or to gracefully fall back to a "good-enough" state.

## How it works

Popcorn plugins need to be written to support popcorn.compatible by adding a simple function that checks for the required features.