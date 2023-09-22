import assert from 'node:assert/strict'
import test from 'node:test'
import rehypeStringify from 'rehype-stringify'
import remarkCommentConfig from 'remark-comment-config'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkStringify from 'remark-stringify'
import {unified} from 'unified'

test('remarkCommentConfig', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(
      Object.keys(await import('remark-comment-config')).sort(),
      ['default']
    )
  })

  await t.test(
    'should not throw if without parser or compiler',
    async function () {
      assert.doesNotThrow(function () {
        unified().use(remarkCommentConfig).freeze()
      })
    }
  )

  await t.test('should set parse options', async function () {
    assert.equal(
      await comments('<!--remark commonmark-->\n\n1)  Foo'),
      '<!--remark commonmark-->\n\n1. Foo\n'
    )
  })

  await t.test('should set stringification options', async function () {
    assert.equal(
      await comments('<!--remark bullet="+"-->\n\n- Foo'),
      '<!--remark bullet="+"-->\n\n+ Foo\n'
    )
  })

  await t.test('should ignore non-remark comments', async function () {
    assert.equal(
      await comments('<!--other bullet="+"-->\n\n- Foo'),
      '<!--other bullet="+"-->\n\n* Foo\n'
    )
  })

  await t.test(
    'should throw exceptions with location information',
    async function () {
      try {
        await comments('<!--remark bullet="?"-->\n\n- Foo')
        assert.fail()
      } catch (error) {
        assert.match(
          String(error),
          /Cannot serialize items with `\?` for `options.bullet`/
        )
      }
    }
  )

  await t.test('should ignore a different compiler', async function () {
    assert.equal(
      String(
        await unified()
          .use(remarkParse)
          .use(remarkRehype)
          .use(rehypeStringify)
          .use(remarkCommentConfig)
          .process('<!--remark bullet="+"-->\n\n- Foo')
      ),
      '<ul>\n<li>Foo</li>\n</ul>'
    )
  })

  await t.test('should not fail on empty html', async function () {
    assert.equal(
      String(
        unified()
          .use(remarkStringify)
          .use(remarkCommentConfig)
          .freeze()
          .stringify({type: 'root', children: [{type: 'html', value: ''}]})
      ),
      ''
    )
  })
})

/**
 * Process.
 *
 * @param {string} value
 *   Document.
 * @returns {Promise<string>}
 *   Processed document.
 */
async function comments(value) {
  return String(
    await unified()
      .use(remarkParse)
      .use(remarkStringify)
      .use(remarkCommentConfig)
      .process(value)
  )
}
