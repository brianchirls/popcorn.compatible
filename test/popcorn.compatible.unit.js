//not gonna be annoying
window.addEventListener('DOMContentLoaded', function() {
	var video = document.getElementById('video');
	video.muted = true;
	video.addEventListener('loadedmetadata', function() {
		QUnit.start();
	}, false);
}, false);

module('Core');
test('Core', function() {
	var p, props = 0;
	
	expect(5);

	ok(Popcorn.incompatible, 'Popcorn.incompatible exists');
	ok(Popcorn.fallback, 'Popcorn.fallback exists');
	
	equal(typeof Popcorn.incompatible, 'function', 'Popcorn.incompatible is a function');
	equal(typeof Popcorn.fallback, 'function', 'Popcorn.fallback is a function');
	
	for (p in Popcorn) {
		props++;
	}
	
	equal(props - window.popcornProperties, 2, 'Only 2 properties added to Popcorn');
});
