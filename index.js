/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module remark:comment-config
 * @fileoverview Configure remark with comments.
 */

'use strict';

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var commentMarker = require('mdast-comment-marker');

/**
 * Wrapper factory.
 *
 * @param {Function} original - Spied on function.
 * @return {Function} - Spy.
 */
function factory(original) {
    /**
     * Replacer for tokeniser or visitor.
     *
     * @param {Node|Function} node - Node, when visitor,
     *   or `eat`.
     * @return {*} - Result of the spied on function.
     */
    function replacement(node) {
        var self = this;
        var result = original.apply(self, arguments);
        var marker = commentMarker(result && result.type ? result : node);

        if (marker && marker.name === 'remark') {
            try {
                self.setOptions(marker.parameters);
            } catch (exception) {
                self.file.fail(exception.message, marker.node);
            }
        }

        return result;
    }

    replacement.locator = original.locator;

    return replacement;
}

/**
 * Modify remark to read configuration from comments.
 *
 * @param {Remark} remark - Instance.
 */
function attacher(remark) {
    var parser = remark.Parser.prototype;
    var compiler = remark.Compiler.prototype;

    parser.blockTokenizers.html = factory(parser.blockTokenizers.html);
    parser.inlineTokenizers.html = factory(parser.inlineTokenizers.html);
    compiler.visitors.html = factory(compiler.visitors.html);
}

/*
 * Expose.
 */

module.exports = attacher;
