'use strict';

// MODULES //

var isWindows = require( 'check-if-windows' );


// VARIABLES //

var RE;

// Match a trailing slash...
if ( isWindows ) {
	RE = /[^:]\\$/;
} else {
	RE = /.\/$/;
}


// TMPDIR //

/**
* FUNCTION: tmpdir()
*	Returns the operating system's directory for temporary files.
*
* @returns {String} directory
*/
function tmpdir() {
	var tmp;
	// Introduced in io.js and Node v4. See https://github.com/nodejs/node/blob/9cd44bb2b683446531306bbcff8739fc3526d02c/lib/os.js#L31.
	if ( isWindows ) {
		tmp = process.env.TEMP ||
			process.env.TMP ||
			(process.env.SystemRoot || process.env.windir) + '\\temp';
	} else {
		tmp = process.env.TMPDIR ||
			process.env.TMP ||
			process.env.TEMP ||
			'/tmp';
	}
	if ( RE.test( tmp ) ) {
		tmp = tmp.slice( 0, -1 );
	}
	return tmp;
} // end FUNCTION tmpdir()


// EXPORTS //

module.exports = tmpdir;
