/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module remark:comment-config
 * @fileoverview Test suite for `remark-comment-config`.
 */

'use strict';

/* eslint-env node, mocha */

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

describe('remark-comment-config()', function () {
    it('should set parse options', function () {
        assert(comments([
            '<!--remark commonmark-->',
            '',
            '1)  Foo',
            ''
        ].join('\n')) === [
            '<!--remark commonmark-->',
            '',
            '1.  Foo',
            ''
        ].join('\n'));
    });

    it('should set stringification options', function () {
        assert(comments([
            '<!--remark bullet="*"-->',
            '',
            '-   Foo',
            ''
        ].join('\n')) === [
            '<!--remark bullet="*"-->',
            '',
            '*   Foo',
            ''
        ].join('\n'));
    });

    it('should throw exceptions with location information', function () {
        assert.throws(function () {
            comments([
                '<!--remark bullet="?"-->',
                '',
                '-   Foo',
                ''
            ].join('\n'));
        }, /1:1-1:25: Invalid value `\?` for setting `options\.bullet`/);
    });
});
