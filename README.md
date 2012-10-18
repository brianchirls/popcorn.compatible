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

Popcorn plugins need to be written to support popcorn.compatible by adding a simple function that checks for the required features. Just as all plugins have `_setup`, `start` and `end` functions, plugin authors can add a functions called `incompatible` that returns `false` if the compatibility test passes, or a string containing an error message if the test fails.

See examples for details.

## Usage

### Test Popcorn.js Compatibility

Test for basic Popcorn.js compatibility by calling `Popcorn.incompatible()` on the global `Popcorn` object:

	var err = Popcorn.incompatible();
	if (err) {
		console.log('Popcorn is incompatible:' + err);
	} else {
		//Everything is fine! Make Popcorn!
	}

`Popcorn.incompatible()` will return a string containing an error message describing the problem, or false if there is no error.

Current tests include:
- support for `addEventListener`
- support for html5 video. If any Popcorn player wrappers, like the ones for YouTube or Vimeo are loaded, this test is ignored.

### Test Plugin Compatibility

Test for individual plugin compatibility by passing the plugin name as a parameter:

	var msg = Popcorn.incompatible('myplugin');
	if (msg) {
		console.log('myplugin is not supported: ' + msg);
	}

	// You can also run this on a popcorn instance, and it works the same way:
	var popcorn = Popcorn('#video');
	if (popcorn.incompatible('myplugin')) {
		console.log('sorry, not gonna work.');
	}

You can get a list of all incompatible plugins by calling `.incompatible()` on the Popcorn instance with no parameters. 

	var popcorn = Popcorn('#video');
	popcorn.myplugin({ start: 0, end: 1 });
	var errors = popcorn.incompatible(); //returns an object listing all incompatible plugins
	Popcorn.forEach(errors, function(msg, plugin) {
		console.log('incompatible plugin [' + plugin + ']: ' + msg);
	});

### Fallback plugin

By default, any incompatible plugins will be ignored. It is possible to replace any incompatible plugins with an error-handler plugin.

	var myfallback = {
		start: function(event, options) {
			console.log('incompatible plugin started at ' + options.start);
		},
		end: function(event, options) {
			console.log('incompatible plugin ended at ' + options.end);
		}
	};

	//use this fallback for all incompatible plugins on all popcorn instances
	Popcorn.fallback(myfallback);

	//use this fallback for a specific plugin on all popcorn instances
	Popcorn.fallback('myplugin', myfallback);

	//use this fallback for all incompatible plugins on a single popcorn instance
	popcorn.fallback(myfallback);

	//use this fallback for a specific plugin on a single popcorn instance
	popcorn.fallback('myplugin', myfallback);

