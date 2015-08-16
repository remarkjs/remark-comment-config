'use strict';

/*
 * Dependencies.
 */

var zone = require('mdast-zone');

/**
 * Wrapper factory.
 *
 * @param {Marker} marker - Marker object.
 * @param {Parser|Compiler} context - Context to set
 *   configuration on.
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
 * @param {MDAST} mdast - Instance.
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
