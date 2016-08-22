/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module remark:comment-config
 * @fileoverview Configure remark with comments.
 */

'use strict';

/* Dependencies. */
var commentMarker = require('mdast-comment-marker');

/* Expose. */
module.exports = commentconfig;

/**
 * Modify `processor` to read configuration from comments.
 */
function commentconfig(processor) {
  var Parser = processor.Parser;
  var Compiler = processor.Compiler;
  var block = Parser && Parser.prototype.blockTokenizers;
  var inline = Parser && Parser.prototype.inlineTokenizers;
  var compiler = Compiler && Compiler.prototype.visitors;

  if (block && block.html) {
    block.html = factory(block.html);
  }

  if (inline && inline.html) {
    inline.html = factory(inline.html);
  }

  if (compiler && compiler.html) {
    compiler.html = factory(compiler.html);
  }
}

/** Wrapper factory. */
function factory(original) {
  replacement.locator = original.locator;

  return replacement;

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
      } catch (err) {
        self.file.fail(err.message, marker.node);
      }
    }

    return result;
  }
}
