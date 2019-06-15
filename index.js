'use strict'

var commentMarker = require('mdast-comment-marker')

module.exports = commentconfig

var origin = 'remark-comment-config:invalid-options'

// Modify `processor` to read configuration from comments.
function commentconfig() {
  var proto = this.Parser && this.Parser.prototype
  var Compiler = this.Compiler
  var block = proto && proto.blockTokenizers
  var inline = proto && proto.inlineTokenizers
  var compiler = Compiler && Compiler.prototype && Compiler.prototype.visitors

  if (block && block.html) {
    block.html = factory(block.html)
  }

  if (inline && inline.html) {
    inline.html = factory(inline.html)
  }

  if (compiler && compiler.html) {
    compiler.html = factory(compiler.html)
  }
}

// Wrapper factory.
function factory(original) {
  replacement.locator = original.locator

  return replacement

  // Replacer for tokeniser or visitor.
  function replacement(node) {
    var self = this
    var result = original.apply(self, arguments)
    var marker = commentMarker(result && result.type ? result : node)

    if (marker && marker.name === 'remark') {
      try {
        self.setOptions(marker.parameters)
      } catch (error) {
        self.file.fail(error.message, marker.node, origin)
      }
    }

    return result
  }
}
