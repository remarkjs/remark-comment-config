'use strict'

var test = require('tape')
var unified = require('unified')
var parse = require('remark-parse')
var stringify = require('remark-stringify')
var remark2rehype = require('remark-rehype')
var html = require('rehype-stringify')
var commentConfig = require('.')

test('remark-comment-config()', function (t) {
  t.doesNotThrow(function () {
    unified().use(commentConfig).freeze()
  }, 'should not throw if without parser or compiler')

  t.equal(
    comments('<!--remark commonmark-->\n\n1)  Foo'),
    '<!--remark commonmark-->\n\n1.  Foo\n',
    'should set parse options'
  )

  t.equal(
    comments('<!--remark bullet="+"-->\n\n- Foo'),
    '<!--remark bullet="+"-->\n\n+   Foo\n',
    'should set stringification options'
  )

  t.throws(
    function () {
      comments('<!--remark bullet="?"-->\n\n- Foo')
    },
    /1:1-1:25: Invalid value `\?` for setting `options\.bullet`/,
    'should throw exceptions with location information'
  )

  t.doesNotThrow(function () {
    unified().use(commentConfig).freeze()
  }, 'should not throw without parser / compiler')

  t.equal(
    unified()
      .use(parse)
      .use(remark2rehype)
      .use(html)
      .use(commentConfig)
      .processSync('<!--remark bullet="+"-->\n\n- Foo')
      .toString(),
    '<ul>\n<li>Foo</li>\n</ul>',
    'should ignore missing compilers'
  )

  t.end()
})

function comments(value, options) {
  return unified()
    .use(parse)
    .use(stringify)
    .use(commentConfig, options)
    .processSync(value)
    .toString()
}
