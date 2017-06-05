# remark-comment-config [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

Configure [**remark**][remark] with comments.

## Installation

[npm][]:

```bash
npm install remark-comment-config
```

## Usage

Say we have the following file, `example.md`:

```markdown
<!--remark commonmark bullet="*"-->

1) Commonmark list (this is a parse setting)

- List item (this is a stringification setting)
```

And our script, `example.js`, looks as follows:

```javascript
var vfile = require('to-vfile');
var remark = require('remark');
var commentConfig = require('remark-comment-config');

remark()
  .use(commentConfig)
  .process(vfile.readSync('example.md'), function (err, file) {
    if (err) throw err;
    console.log(String(file));
  });
```

Now, running `node example` yields:

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
