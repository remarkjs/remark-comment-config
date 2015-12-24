var commentConfig = require('./index.js');
var remark = require('remark').use(commentConfig);

// Document:
var input = [
    '<!--remark commonmark bullet="*"-->',
    '',
    '1) Commonmark list (this is a parse setting)',
    '',
    '- List item (this is a stringification setting)',
    ''
].join('\n');

// Process:
var doc = remark.process(input);

// Yields:
console.log('markdown', doc);
