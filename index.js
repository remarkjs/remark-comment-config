/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module remark:comment-config
 * @fileoverview Configure remark with comments at runtime.
 */

'use strict';

/* eslint-env commonjs */

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
 * Modify remark to read configuration from comments.
 *
 * @param {Remark} remark - Instance.
 */
function attacher(remark) {
    remark.use(zone({
        'name': 'remark',
        'onparse': on,
        'onstringify': on
    }));
}

/*
 * Expose.
 */

module.exports = attacher;
