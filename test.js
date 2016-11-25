'use strict';

var test = require('tape');
var unified = require('unified');
var remark = require('remark');
var html = require('remark-html');
var commentConfig = require('./');

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

  t.doesNotThrow(
    function () {
      unified().use(commentConfig);
    },
    'should not throw without parser / compiler'
  );

  t.equal(
    remark().use(html).use(commentConfig).process([
      '<!--remark commonmark-->',
      '',
      '1)  Foo',
      ''
    ].join('\n')).toString(),
    [
      '<!--remark commonmark-->',
      '<ol>',
      '<li>Foo</li>',
      '</ol>',
      ''
    ].join('\n'),
    'should ignore missing compilers'
  );

  t.end();
});

function comments(value, options) {
  return remark().use(commentConfig, options).process(value).toString();
}
