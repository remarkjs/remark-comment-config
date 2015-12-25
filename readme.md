# remark-comment-config [![Build Status](https://img.shields.io/travis/wooorm/remark-comment-config.svg)](https://travis-ci.org/wooorm/remark-comment-config) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/remark-comment-config.svg)](https://codecov.io/github/wooorm/remark-comment-config)

Set [**remark**](https://github.com/wooorm/remark) options with comments during
runtime.

## Installation

[npm](https://docs.npmjs.com/cli/install)

```bash
npm install remark-comment-config
```

[Component.js](https://github.com/componentjs/component)

```bash
component install wooorm/remark-comment-config
```

[Duo](http://duojs.org/#getting-started)

```javascript
var commentConfig = require('wooorm/remark-comment-config');
```

UMD: globals, AMD, and CommonJS ([uncompressed](remark-comment-config.js) and [compressed](remark-comment-config.min.js)):

```html
<script src="path/to/remark.js"></script>
<script src="path/to/remark-comment-config.js"></script>
<script>
  remark.use(remarkCommentConfig);
</script>
```

## Table of Contents

*   [Usage](#usage)

*   [CLI](#cli)

*   [API](#api)

    *   [remark.use(commentConfig)](#remarkusecommentconfig)

*   [License](#license)

## Usage

```javascript
var commentConfig = require('remark-comment-config');
var remark = require('remark').use(commentConfig);
```

Document:

```javascript
var input = [
    '<!--remark commonmark bullet="*"-->',
    '',
    '1) Commonmark list (this is a parse setting)',
    '',
    '- List item (this is a stringification setting)',
    ''
].join('\n');
```

Process:

```javascript
var doc = remark.process(input);
```

Yields:

```markdown
<!--remark commonmark bullet="*"-->

1.  Commonmark list (this is a parse setting)

*   List item (this is a stringification setting)
```

## CLI

```bash
remark --use comment-config
```

## API

### [remark](https://github.com/wooorm/remark#api).[use](https://github.com/wooorm/remark#remarkuseplugin-options)(commentConfig)

Parses comments, such as `<!--remark foo="bar" baz-->`, and passes the
“attributes” as [settings](https://github.com/wooorm/remark#remarkprocessvalue-options-done)
to **remark**.

Just like [**remark-yaml-config**](https://github.com/wooorm/remark-yaml-config),
but comments are invisible when rendering to HTML, such as on GitHub.

**Signatures**

*   `remark = remark.use(commentConfig, options?)`.

**Parameters**

*   `commentConfig` — This plugin.

**Returns**

`Object`, see [`remark.use(plugin)`](https://github.com/wooorm/remark#remarkuseplugin-options).

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
