/// <reference types="remark-stringify" />

/**
 * @typedef {import('mdast').Html} Html
 * @typedef {import('mdast').Root} Root
 * @typedef {import('unified').Processor<undefined, undefined, undefined, Root>} Processor
 */

import {commentMarker} from 'mdast-comment-marker'

/**
 * Configure remark with comments.
 *
 * @returns {undefined}
 *   Nothing.
 */
export default function remarkCommentConfig() {
  // @ts-expect-error: TypeScript doesn’t handle `this` well.
  // eslint-disable-next-line unicorn/no-this-assignment
  const self = /** @type {Processor} */ (this)
  const data = self.data()
  const toMarkdownExtensions =
    data.toMarkdownExtensions || (data.toMarkdownExtensions = [])

  toMarkdownExtensions.push({
    handlers: {
      /** @param {Html} node */
      html(node, _, state) {
        const marker = commentMarker(node)

        if (marker && marker.name === 'remark') {
          state.options = {...state.options, ...marker.parameters}
        }

        // Like the source:
        // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/fd6a508/lib/handle/html.js>
        return node.value || ''
      }
    }
  })
}
