# remark-comment-config

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**remark**][remark] plugin to configure it with comments.

## Install

[npm][]:

```sh
npm install remark-comment-config
```

## Use

Say we have the following file, `example.md`:

```markdown
<!--remark commonmark bullet="*"-->

1) Commonmark list (this is a parse setting)

- List item (this is a stringify setting)
```

And our script, `example.js`, looks as follows:

```js
var vfile = require('to-vfile')
var remark = require('remark')
var commentConfig = require('remark-comment-config')

remark()
  .use(commentConfig)
  .process(vfile.readSync('example.md'), function(err, file) {
    if (err) throw err
    console.log(String(file))
  })
```

Now, running `node example` yields:

```markdown
<!--remark commonmark bullet="*"-->

1.  Commonmark list (this is a parse setting)

*   List item (this is a stringify setting)
```

## API

### `remark().use(commentConfig)`

Plugin to configure remark with comments.
Parses comments, such as `<!--remark foo="bar" baz-->`, and passes the
“attributes” as [parse][parse-settings] and [stringify][stringify-settings].

This is essentially the same as [`remark-yaml-config`][remark-yaml-config],
except that comments are invisible when rendering to HTML (such as on GitHub).

## Security

Use of `remark-comment-config` can change how Markdown is parsed or compiled.
If the Markdown is user provided, this may open you up to a
[cross-site scripting (XSS)][xss] attack.

## Related

*   [`remark-yaml-config`][remark-yaml-config]
    — Configure remark from YAML
*   [`remark-message-control`][remark-message-control]
    — Configure messages with comments

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

[build-badge]: https://img.shields.io/travis/remarkjs/remark-comment-config/master.svg

[build]: https://travis-ci.org/remarkjs/remark-comment-config

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-comment-config.svg

[coverage]: https://codecov.io/github/remarkjs/remark-comment-config

[downloads-badge]: https://img.shields.io/npm/dm/remark-comment-config.svg

[downloads]: https://www.npmjs.com/package/remark-comment-config

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-comment-config.svg

[size]: https://bundlephobia.com/result?p=remark-comment-config

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/remark

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/master/contributing.md

[support]: https://github.com/remarkjs/.github/blob/master/support.md

[coc]: https://github.com/remarkjs/.github/blob/master/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[remark]: https://github.com/remarkjs/remark

[parse-settings]: https://github.com/remarkjs/remark/blob/master/packages/remark-parse/readme.md#options

[stringify-settings]: https://github.com/remarkjs/remark/blob/master/packages/remark-stringify/readme.md#options

[remark-yaml-config]: https://github.com/remarkjs/remark-yaml-config

[remark-message-control]: https://github.com/remarkjs/remark-message-control

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting
