import {commentMarker} from 'mdast-comment-marker'

// Modify remark to read configuration from comments.
export default function remarkCommentConfig() {
  const data = this.data()

  // Other extensions.
  /* c8 ignore next */
  if (!data.toMarkdownExtensions) data.toMarkdownExtensions = []

  data.toMarkdownExtensions.push({handlers: {html: commentConfigHtml}})

  function commentConfigHtml(node) {
    const marker = commentMarker(node)

    if (marker && marker.name === 'remark') {
      Object.assign(this.options, marker.parameters)
    }

    // Like the source:
    // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/e40e015/lib/handle/html.js#L4>
    return node.value || ''
  }
}
