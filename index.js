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
    try {
        context.setOptions(marker.parameters);
    } catch (exception) {
        context.file.fail(exception.message, marker.node);
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
