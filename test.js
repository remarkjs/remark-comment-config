/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module remark:comment-config
 * @fileoverview Test suite for `remark-comment-config`.
 */

'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var test = require('tape');
var remark = require('remark');
var commentConfig = require('./');

/**
 * Shortcut to process.
 *
 * @param {string} value - Value to test.
 * @param {Object?} options - Configuration.
 * @return {string} - Processed `value`.
 */
function comments(value, options) {
    return remark().use(commentConfig, options).process(value).toString();
}

/*
 * Tests.
 */

test('remark-comment-config()', function (t) {
    t.equal(
        comments([
            '<!--remark commonmark-->',
            '',
            '1)  Foo',
            ''
        ].join('\n')),
        [
            '<!--remark commonmark-->',
            '',
            '1.  Foo',
            ''
        ].join('\n'),
        'should set parse options'
    );

    t.equal(
        comments([
            '<!--remark bullet="*"-->',
            '',
            '-   Foo',
            ''
        ].join('\n')),
        [
            '<!--remark bullet="*"-->',
            '',
            '*   Foo',
            ''
        ].join('\n'),
        'should set stringification options'
    );

    t.throws(
        function () {
            comments([
                '<!--remark bullet="?"-->',
                '',
                '-   Foo',
                ''
            ].join('\n'));
        },
        /1:1-1:25: Invalid value `\?` for setting `options\.bullet`/,
        'should throw exceptions with location information'
    );

    t.end();
});
