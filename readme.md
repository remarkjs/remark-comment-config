# remark-comment-config

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[remark][]** plugin to configure it with comments.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(remarkCommentConfig)`](#unifieduseremarkcommentconfig)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a [unified][] ([remark][]) plugin to configure remark
(specifically, how `remark-stringify` formats markdown) from comments.

**unified** is a project that transforms content with abstract syntax trees
(ASTs).
**remark** adds support for markdown to unified.
**mdast** is the markdown AST that remark uses.
This is a remark plugin that configures how `remark-stringify` serializes mdast.

## When should I use this?

This project is useful when you want to change how markdown is formatted,
repeatedly, from within a file.
You can use this when you trust authors and want to give them control.

This plugin is very similar to the alternative
[`remark-yaml-config`][remark-yaml-config].
The difference is that that plugin uses YAML frontmatter, which comes at the
start of documents, whereas this plugin uses comments, which can come anywhere
in the document.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install remark-comment-config
```

In Deno with [Skypack][]:

```js
import remarkCommentConfig from 'https://cdn.skypack.dev/remark-comment-config@7?dts'
```

In browsers with [Skypack][]:

```html
<script type="module">
  import remarkCommentConfig from 'https://cdn.skypack.dev/remark-comment-config@7?min'
</script>
```

## Use

Say we have the following file `example.md`:

```markdown
<!--remark bullet="+"-->

- a

<!--remark bullet="-"-->

- b

<!--remark bullet="*"-->

- c
```

And our module `example.js` looks as follows:

```js
import {read} from 'to-vfile'
import {remark} from 'remark'
import remarkCommentConfig from 'remark-comment-config'

main()

async function main() {
  const file = await remark()
    .use(remarkCommentConfig)
    .process(await read('example.md'))

  console.log(String(file))
}
```

Now running `node example.js` yields:

```markdown
<!--remark bullet="+"-->

+   a

<!--remark bullet="-"-->

-   b

<!--remark bullet="*"-->

*   c
```

## API

This package exports no identifiers.
The default export is `remarkCommentConfig`.

### `unified().use(remarkCommentConfig)`

Configure remark with comments.
There are no options.

Comments should start with `remark` and contain “attributes” for settings.
For example, `<!--remark foo="bar" baz-->`.
The settings are passed to [`remark-stringify`][stringify-settings].

## Types

This package is fully typed with [TypeScript][].
There are no extra exported types.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

This plugin works with `remark` version 13+.
Version 5 (and lower) worked with older versions of remark.

## Security

Use of `remark-comment-config` can change how markdown is compiled.
If the markdown is user provided, this may open you up to a
[cross-site scripting (XSS)][xss] attack.

## Related

*   [`remark-yaml-config`][remark-yaml-config]
    — configure remark with YAML
*   [`remark-message-control`][remark-message-control]
    — configure messages with comments

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/remarkjs/remark-comment-config/workflows/main/badge.svg

[build]: https://github.com/remarkjs/remark-comment-config/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-comment-config.svg

[coverage]: https://codecov.io/github/remarkjs/remark-comment-config

[downloads-badge]: https://img.shields.io/npm/dm/remark-comment-config.svg

[downloads]: https://www.npmjs.com/package/remark-comment-config

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-comment-config.svg

[size]: https://bundlephobia.com/result?p=remark-comment-config

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[skypack]: https://www.skypack.dev

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[remark]: https://github.com/remarkjs/remark

[unified]: https://github.com/unifiedjs/unified

[typescript]: https://www.typescriptlang.org

[stringify-settings]: https://github.com/remarkjs/remark/blob/HEAD/packages/remark-stringify/readme.md#options

[remark-yaml-config]: https://github.com/remarkjs/remark-yaml-config

[remark-message-control]: https://github.com/remarkjs/remark-message-control

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting
