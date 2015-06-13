# mdast-comment-config [![Build Status](https://img.shields.io/travis/wooorm/mdast-comment-config.svg?style=flat)](https://travis-ci.org/wooorm/mdast-comment-config) [![Coverage Status](https://img.shields.io/coveralls/wooorm/mdast-comment-config.svg?style=flat)](https://coveralls.io/r/wooorm/mdast-comment-config?branch=master)

Set [**mdast**](https://github.com/wooorm/mdast) options with comments during
runtime.

## Installation

[npm](https://docs.npmjs.com/cli/install)

```bash
npm install mdast-comment-config
```

[Component.js](https://github.com/componentjs/component)

```bash
component install wooorm/mdast-comment-config
```

[Bower](http://bower.io/#install-packages)

```bash
bower install mdast-comment-config
```

[Duo](http://duojs.org/#getting-started)

```javascript
var commentConfig = require('wooorm/mdast-comment-config');
```

UMD: globals, AMD, and CommonJS ([uncompressed](mdast-comment-config.js) and [compressed](mdast-comment-config.min.js)):

```html
<script src="path/to/mdast.js"></script>
<script src="path/to/mdast-comment-config.js"></script>
<script>
  mdast.use(mdastCommentConfig);
</script>
```

## Table of Contents

*   [Usage](#usage)

*   [CLI](#cli)

*   [API](#api)

    *   [mdast.use(commentConfig)](#mdastusecommentconfig)

*   [License](#license)

## Usage

```javascript
var commentConfig = require('mdast-comment-config');
var mdast = require('mdast').use(commentConfig);
```

Document:

```javascript
var input = [
    '<!--mdast commonmark bullet="*"-->',
    '',
    '1) Commonmark list (this is a parse setting)',
    '',
    '- List item (this is a stringification setting)',
    ''
].join('\n');
```

Process:

```javascript
var doc = mdast.process(input);
```

Yields:

```markdown
<!--mdast commonmark bullet="*"-->

1.  Commonmark list (this is a parse setting)

*   List item (this is a stringification setting)
```

## CLI

```bash
mdast --use comment-config
```

## API

### [mdast](https://github.com/wooorm/mdast#api).[use](https://github.com/wooorm/mdast#mdastuseplugin-options)(commentConfig)

Parses comments, such as `<!--mdast foo="bar" baz-->`, and passes the
“attributes” as [settings](https://github.com/wooorm/mdast#mdastprocessvalue-options-done)
to **mdast**.

Just like [**mdast-yaml-config**](https://github.com/wooorm/mdast-yaml-config),
but comments are invisible when rendering to HTML, such as on GitHub.

**Signatures**

*   `mdast = mdast.use(commentConfig, options?)`.

**Parameters**

*   `commentConfig` — This plugin.

**Returns**

`Object`, see [`mdast.use(plugin)`](https://github.com/wooorm/mdast#mdastuseplugin-options).

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
