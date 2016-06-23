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
 * @param {Unified} processor - Instance.
 */
function attacher(processor) {
    var Parser = processor.Parser;
    var Compiler = processor.Compiler;
    var block = Parser && Parser.prototype.blockTokenizers;
    var inline = Parser && Parser.prototype.inlineTokenizers;
    var compiler = Compiler && Compiler.prototype.visitors;

    if (block) {
        block.html = factory(block.html);
    }

    if (block) {
        inline.html = factory(inline.html);
    }

    if (compiler && compiler.html) {
        compiler.html = factory(compiler.html);
    }
}

/*
 * Expose.
 */

module.exports = attacher;
