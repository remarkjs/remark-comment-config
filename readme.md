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

- List item (this is a stringify setting)
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

*   List item (this is a stringify setting)
```

## API

### `remark().use(commentConfig)`

Parses comments, such as `<!--remark foo="bar" baz-->`, and passes the
“attributes” as [parse][parse-settings] and [stringify][stringify-settings].

This is essentially the same as [`remark-yaml-config`][remark-yaml-config],
except that comments are invisible when rendering to HTML (such as on GitHub).

## Related

*   [`remark-yaml-config`][remark-yaml-config]
    — Configure remark from YAML
*   [`remark-message-control`][remark-message-control]
    — Configure messages with comments

## Contribute

See [`contribute.md` in `remarkjs/remarkjs`][contribute] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/remarkjs/remark-comment-config.svg

[build-status]: https://travis-ci.org/remarkjs/remark-comment-config

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-comment-config.svg

[coverage-status]: https://codecov.io/github/remarkjs/remark-comment-config

[chat-badge]: https://img.shields.io/gitter/room/remarkjs/Lobby.svg

[chat]: https://gitter.im/remarkjs/Lobby

[license]: LICENSE

[author]: http://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/remarkjs/remark

[parse-settings]: https://github.com/remarkjs/remark/blob/master/packages/remark-parse/readme.md#options

[stringify-settings]: https://github.com/remarkjs/remark/blob/master/packages/remark-stringify/readme.md#options

[remark-yaml-config]: https://github.com/remarkjs/remark-yaml-config

[remark-message-control]: https://github.com/remarkjs/remark-message-control

[contribute]: https://github.com/remarkjs/remark/blob/master/contributing.md

[coc]: https://github.com/remarkjs/remark/blob/master/code-of-conduct.md
