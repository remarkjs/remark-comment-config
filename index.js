'use strict';

/*
 * Dependencies.
 */

var zone = require('mdast-zone');

/**
 * Wrapper factory.
 *
 * @param {Marker} marker
 * @param {Parser|Compiler} context
 */
function on(marker, context) {
    var config = marker.parameters;
    var position;
    var err;

    try {
        context.setOptions(config);
    } catch (exception) {
        position = marker.node.position.start;

        err = new Error(
            position.line + ':' + position.column + ': ' +
            exception.message
        );

        err.reason = exception.message;
        err.line = position.line;
        err.column = position.column;

        throw err;
    }
}

/**
 * Modify mdast to parse/stringify YAML.
 *
 * @param {MDAST} mdast
 */
function attacher(mdast) {
    mdast.use(zone({
        'name': 'mdast',
        'onparse': on,
        'onstringify': on
    }));
}

/*
 * Expose.
 */

module.exports = attacher;
