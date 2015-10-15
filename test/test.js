/* global require, describe, it */
'use strict';

var mpath = './../lib';


// MODULES //

var chai = require( 'chai' ),
	os = require( 'os' ),
	proxyquire = require( 'proxyquire' ),
	tmpdir = require( mpath );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'utils-tmpdir', function tests() {

	it( 'should export a function', function test() {
		expect( tmpdir ).to.be.a( 'function' );
	});

	it( 'should alias `os.tmpdir`', function test() {
		var tmp;
		if ( os.tmpdir === void 0 ) {
			// Older Node versions...
			os.tmpdir = mock;
		}
		tmp = os.tmpdir();
		if ( /.\/$/.test( tmp ) ) {
			tmp = tmp.slice( 0, -1 );
		}
		assert.strictEqual( tmpdir(), tmp );

		if ( os.tmpdir === mock ) {
			delete os.tmpdir;
		}

		function mock() {
			var tmp;
			// Assume tests are run on Linux env...
			tmp = process.env[ 'TMPDIR' ];
			if ( /.\/$/.test( tmp ) ) {
				tmp = tmp.slice( 0, -1 );
			}
			return tmp;
		}
	});

	it( 'should support older Node versions', function test() {
		var fcn;

		if ( os.tmpdir === void 0 ) {
			assert.strictEqual( tmpdir(), process.env[ 'TMPDIR' ] );
		} else {
			fcn = os.tmpdir;
			delete os.tmpdir;

			// Assume Linux env...
			assert.strictEqual( tmpdir(), process.env[ 'TMPDIR' ].slice( 0, -1 ) );

			os.tmpdir = fcn;
		}
	});

	it( 'should support Linux (TMPDIR)', function test() {
		var fcn,
			env;

		if ( os.tmpdir !== void 0 ) {
			fcn = os.tmpdir;
			os.tmpdir = undefined;
		}
		env = process.env;
		process.env = {
			'TMPDIR': '/beep/boop'
		};

		assert.strictEqual( tmpdir(), '/beep/boop' );

		if ( fcn  ) {
			os.tmpdir = fcn;
		}
		process.env = env;
	});

	it( 'should support Linux (TMP)', function test() {
		var fcn,
			env;

		if ( os.tmpdir !== void 0 ) {
			fcn = os.tmpdir;
			os.tmpdir = undefined;
		}
		env = process.env;
		process.env = {
			'TMP': '/beep/boop'
		};

		assert.strictEqual( tmpdir(), '/beep/boop' );

		if ( fcn  ) {
			os.tmpdir = fcn;
		}
		process.env = env;
	});

	it( 'should support Linux (TEMP)', function test() {
		var fcn,
			env;

		if ( os.tmpdir !== void 0 ) {
			fcn = os.tmpdir;
			os.tmpdir = undefined;
		}
		env = process.env;
		process.env = {
			'TEMP': '/beep/boop'
		};

		assert.strictEqual( tmpdir(), '/beep/boop' );

		if ( fcn  ) {
			os.tmpdir = fcn;
		}
		process.env = env;
	});

	it( 'should fallback to `/tmp` on Linux', function test() {
		var fcn,
			env;

		if ( os.tmpdir !== void 0 ) {
			fcn = os.tmpdir;
			os.tmpdir = undefined;
		}
		env = process.env;
		process.env = {};

		assert.strictEqual( tmpdir(), '/tmp' );

		if ( fcn  ) {
			os.tmpdir = fcn;
		}
		process.env = env;
	});

	it( 'should support Windows (TEMP)', function test() {
		var tmpdir,
			fcn,
			env;

		if ( os.tmpdir !== void 0 ) {
			fcn = os.tmpdir;
			os.tmpdir = undefined;
		}
		tmpdir = proxyquire( mpath, {
			'check-if-windows': true
		});

		env = process.env;
		process.env = {
			'TEMP': 'C:\\Beep\\Boop'
		};

		assert.strictEqual( tmpdir(), 'C:\\Beep\\Boop' );

		if ( fcn  ) {
			os.tmpdir = fcn;
		}
		process.env = env;
	});

	it( 'should support Windows (TMP)', function test() {
		var tmpdir,
			fcn,
			env;

		if ( os.tmpdir !== void 0 ) {
			fcn = os.tmpdir;
			os.tmpdir = undefined;
		}
		tmpdir = proxyquire( mpath, {
			'check-if-windows': true
		});

		env = process.env;
		process.env = {
			'TMP': 'C:\\Beep\\Boop'
		};

		assert.strictEqual( tmpdir(), 'C:\\Beep\\Boop' );

		if ( fcn  ) {
			os.tmpdir = fcn;
		}
		process.env = env;
	});

	it( 'should support Windows (SystemRoot)', function test() {
		var tmpdir,
			fcn,
			env;

		if ( os.tmpdir !== void 0 ) {
			fcn = os.tmpdir;
			os.tmpdir = undefined;
		}
		tmpdir = proxyquire( mpath, {
			'check-if-windows': true
		});

		env = process.env;
		process.env = {
			'SystemRoot': 'C:\\Beep\\Boop'
		};

		assert.strictEqual( tmpdir(), 'C:\\Beep\\Boop\\temp' );

		if ( fcn  ) {
			os.tmpdir = fcn;
		}
		process.env = env;
	});

	it( 'should support Windows (windir)', function test() {
		var tmpdir,
			fcn,
			env;

		if ( os.tmpdir !== void 0 ) {
			fcn = os.tmpdir;
			os.tmpdir = undefined;
		}
		tmpdir = proxyquire( mpath, {
			'check-if-windows': true
		});

		env = process.env;
		process.env = {
			'windir': 'C:\\Beep\\Boop'
		};

		assert.strictEqual( tmpdir(), 'C:\\Beep\\Boop\\temp' );

		if ( fcn  ) {
			os.tmpdir = fcn;
		}
		process.env = env;
	});

	it( 'should remove trailing slashes', function test() {
		var fcn,
			env;

		if ( os.tmpdir !== void 0 ) {
			fcn = os.tmpdir;
			os.tmpdir = undefined;
		}
		env = process.env[ 'TMPDIR' ];
		process.env[ 'TMPDIR' ] = 'foo/bar/';

		assert.strictEqual( tmpdir(), 'foo/bar' );

		if ( fcn  ) {
			os.tmpdir = fcn;
		}
		process.env[ 'TMPDIR' ] = env;
	});

});
