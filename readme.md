# remark-comment-config [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Set [**remark**][remark] options with comments during runtime.

## Installation

[npm][npm-install]:

```bash
npm install remark-comment-config
```

**remark-comment-config** is also available as an AMD, CommonJS, and
globals module, [uncompressed and compressed][releases].

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

### `remark.use(commentConfig)`

Parses comments, such as `<!--remark foo="bar" baz-->`, and passes the
“attributes” as [settings](https://github.com/wooorm/remark#remarkprocessvalue-options-done)
to **remark**.

Just like [**remark-yaml-config**](https://github.com/wooorm/remark-yaml-config),
but comments are invisible when rendering to HTML, such as on GitHub.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/remark-comment-config/master.svg

[travis]: https://travis-ci.org/wooorm/remark-comment-config

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/remark-comment-config.svg

[codecov]: https://codecov.io/github/wooorm/remark-comment-config

[npm-install]: https://docs.npmjs.com/cli/install

[releases]: https://github.com/wooorm/remark-comment-config/releases

[license]: LICENSE

[author]: http://wooorm.com

[remark]: https://github.com/wooorm/remark
