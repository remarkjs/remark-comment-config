'use strict';

/* eslint-env mocha */

/*
 * Dependencies.
 */

var assert = require('assert');
var mdast = require('mdast');
var commentConfig = require('./');

/**
 * Shortcut to process.
 *
 * @param {string} value - Value to test.
 * @param {Object?} options - Configuration.
 * @return {string}
 */
function comments(value, options) {
    return mdast.use(commentConfig, options).process(value);
}

/*
 * Tests.
 */

describe('mdast-comment-config()', function () {
    it('should set parse options', function () {
        assert(comments([
            '<!--mdast commonmark-->',
            '',
            '1)  Foo',
            ''
        ].join('\n')) === [
            '<!--mdast commonmark-->',
            '',
            '1.  Foo',
            ''
        ].join('\n'));
    });

    it('should set stringification options', function () {
        assert(comments([
            '<!--mdast bullet="*"-->',
            '',
            '-   Foo',
            ''
        ].join('\n')) === [
            '<!--mdast bullet="*"-->',
            '',
            '*   Foo',
            ''
        ].join('\n'));
    });

    it('should throw exceptions with location information', function () {
        assert.throws(function () {
            comments([
                '<!--mdast bullet="?"-->',
                '',
                '-   Foo',
                ''
            ].join('\n'));
        }, /Error: 1:1: Invalid value `\?` for setting `options\.bullet`/);
    });
});
