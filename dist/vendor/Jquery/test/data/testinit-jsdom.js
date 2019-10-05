"use strict";

// Support: jsdom 13.2+
// jsdom implements a throwing `window.scrollTo`.
QUnit.config.scrolltop = false;

const FILEPATH = "/test/data/testinit-jsdom.js";
const activeScript = document.currentScript;
const parentUrl = activeScript && activeScript.src ?
	activeScript.src.replace( /[?#].*/, "" ) + FILEPATH.replace( /[^/]+/g, ".." ) + "/" :
	"../";
const supportjQuery = this.jQuery;

// baseURL is intentionally set to "data/" instead of "".
// This is not just for convenience (since most files are in data/)
// but also to ensure that urls without prefix fail.
// Otherwise it's easy to write tests that pass on test/index.html
// but fail in Karma runner (where the baseURL is different).
const baseURL = parentUrl + "test/data/";

// Setup global variables before loading jQuery for testing .noConflict()
supportjQuery.noConflict( true );
window.originaljQuery = this.jQuery = undefined;
window.original$ = this.$ = "replaced";

/**
 * Add random number to url to stop caching
 *
 * Also prefixes with baseURL automatically.
 *
 * @example url("index.html")
 * @result "data/index.html?10538358428943"
 *
 * @example url("mock.php?foo=bar")
 * @result "data/mock.php?foo=bar&10538358345554"
 */
function url( value ) {
	return baseURL + value + ( /\?/.test( value ) ? "&" : "?" ) +
		new Date().getTime() + "" + parseInt( Math.random() * 100000, 10 );
}
