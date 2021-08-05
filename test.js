import test from 'tape'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import remarkCommentConfig from './index.js'

test('remarkCommentConfig', function (t) {
  t.doesNotThrow(function () {
    unified().use(remarkCommentConfig).freeze()
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

  t.equal(
    comments('<!--other bullet="+"-->\n\n- Foo'),
    '<!--other bullet="+"-->\n\n*   Foo\n',
    'should ignore non-remark comments'
  )

  t.throws(
    function () {
      comments('<!--remark bullet="?"-->\n\n- Foo')
    },
    /Cannot serialize items with `\?` for `options.bullet`/,
    'should throw exceptions with location information'
  )

  t.doesNotThrow(function () {
    unified().use(remarkCommentConfig).freeze()
  }, 'should not throw without parser / compiler')

  t.equal(
    unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeStringify)
      .use(remarkCommentConfig)
      .processSync('<!--remark bullet="+"-->\n\n- Foo')
      .toString(),
    '<ul>\n<li>Foo</li>\n</ul>',
    'should ignore a different compiler'
  )

  t.equal(
    unified()
      .use(remarkStringify)
      .use(remarkCommentConfig)
      .freeze()
      .stringify({type: 'root', children: [{type: 'html', value: ''}]})
      .toString(),
    '',
    'should not fail on empty html'
  )

  t.end()
})

function comments(value, options) {
  return unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkCommentConfig, options)
    .processSync(value)
    .toString()
}
