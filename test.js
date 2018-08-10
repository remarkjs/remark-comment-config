'use strict';

var test = require('tape');
var unified = require('unified');
var parse = require('remark-parse');
var stringify = require('remark-stringify');
var remark2rehype = require('remark-rehype');
var html = require('rehype-stringify');
var commentConfig = require('.');

test('remark-comment-config()', function (t) {
  t.doesNotThrow(
    function () {
      unified().use(commentConfig).freeze();
    },
    'should not throw if without parser or compiler'
  );

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

  t.doesNotThrow(
    function () {
      unified().use(commentConfig).freeze();
    },
    'should not throw without parser / compiler'
  );

  t.equal(
    unified()
      .use(parse)
      .use(remark2rehype)
      .use(html)
      .use(commentConfig)
      .processSync([
        '<!--remark commonmark-->',
        '',
        '1)  Foo',
        ''
      ].join('\n'))
      .toString(),
    [
      '<ol>',
      '<li>Foo</li>',
      '</ol>'
    ].join('\n'),
    'should ignore missing compilers'
  );

  t.end();
});

function comments(value, options) {
  return unified()
    .use(parse)
    .use(stringify)
    .use(commentConfig, options)
    .processSync(value)
    .toString();
}
