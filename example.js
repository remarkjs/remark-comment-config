// Dependencies:
var commentConfig = require('./index.js');
var remark = require('remark');

// Process:
var file = remark().use(commentConfig).process([
    '<!--remark commonmark bullet="*"-->',
    '',
    '1) Commonmark list (this is a parse setting)',
    '',
    '- List item (this is a stringification setting)',
    ''
].join('\n'));

// Yields:
console.log('markdown', String(file));
