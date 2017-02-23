'use strict';

var commentMarker = require('mdast-comment-marker');

module.exports = commentconfig;

/* Modify `processor` to read configuration from comments. */
function commentconfig() {
  var Parser = this.Parser;
  var Compiler = this.Compiler;
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

/* Wrapper factory. */
function factory(original) {
  replacement.locator = original.locator;

  return replacement;

  /* Replacer for tokeniser or visitor. */
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
