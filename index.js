/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').HTML} HTML
 * @typedef {import('mdast-util-to-markdown').Options} Extension
 */

import {commentMarker} from 'mdast-comment-marker'

/**
 * Plugin to configure remark with comments.
 *
 * @type {import('unified').Plugin<void[], Root>}
 */
export default function remarkCommentConfig() {
  const data = this.data()
  /** @type {Extension} */
  const commentConfig = {
    handlers: {
      /** @param {HTML} node */
      html(node) {
        const marker = commentMarker(node)

        if (marker && marker.name === 'remark') {
          Object.assign(this.options, marker.parameters)
        }

        // Like the source:
        // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/e40e015/lib/handle/html.js#L4>
        return node.value || ''
      }
    }
  }

  const extensions = /** @type {Extension[]} */ (
    // Other extensions
    /* c8 ignore next 2 */
    data.toMarkdownExtensions
      ? data.toMarkdownExtensions
      : (data.toMarkdownExtensions = [])
  )

  extensions.push(commentConfig)
}
