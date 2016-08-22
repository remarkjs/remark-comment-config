# remark-comment-config [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

Configure [**remark**][remark] with comments.

## Installation

[npm][]:

```bash
npm install remark-comment-config
```

## Usage

Dependencies:

```javascript
var commentConfig = require('remark-comment-config');
var remark = require('remark');
```

Process:

```javascript
var file = remark().use(commentConfig).process([
    '<!--remark commonmark bullet="*"-->',
    '',
    '1) Commonmark list (this is a parse setting)',
    '',
    '- List item (this is a stringification setting)',
    ''
].join('\n'));
```

Yields:

```markdown
<!--remark commonmark bullet="*"-->

1.  Commonmark list (this is a parse setting)

*   List item (this is a stringification setting)
```

## API

### `remark().use(commentConfig)`

Parses comments, such as `<!--remark foo="bar" baz-->`, and passes the
“attributes” as [parse][parse-settings] and [stringify][stringify-settings].

Just like [**remark-yaml-config**][remark-yaml-config], but comments are
invisible when rendering to HTML, such as on GitHub.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/wooorm/remark-comment-config.svg

[build-status]: https://travis-ci.org/wooorm/remark-comment-config

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/remark-comment-config.svg

[coverage-status]: https://codecov.io/github/wooorm/remark-comment-config

[chat-badge]: https://img.shields.io/gitter/room/wooorm/remark.svg

[chat]: https://gitter.im/wooorm/remark

[license]: LICENSE

[author]: http://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/wooorm/remark

[parse-settings]: https://github.com/wooorm/remark/blob/master/packages/remark-parse/readme.md#options

[stringify-settings]: https://github.com/wooorm/remark/blob/master/packages/remark-stringify/readme.md#options

[remark-yaml-config]: https://github.com/wooorm/remark-yaml-config
