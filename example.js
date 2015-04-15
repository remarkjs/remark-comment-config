var commentConfig = require('./index.js');
var mdast = require('mdast').use(commentConfig);

// Document:
var input = [
    '<!--mdast commonmark bullet="*"-->',
    '',
    '1) Commonmark list (this is a parse setting)',
    '',
    '- List item (this is a stringification setting)',
    ''
].join('\n');

// Process:
var doc = mdast.process(input);

// Yields:
console.log('markdown', doc);
