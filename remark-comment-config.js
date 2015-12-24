(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.remarkCommentConfig = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"mdast-zone":2}],2:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:zone
 * @fileoverview HTML comments as ranges or markers in mdast.
 */

'use strict';

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var visit = require('unist-util-visit');

/*
 * Methods.
 */

var splice = [].splice;

/*
 * Expression for parsing parameters.
 */

var PARAMETERS = new RegExp(
    '\\s*' +
    '(' +
        '[-a-z09_]+' +
    ')' +
    '(?:' +
        '=' +
        '(?:' +
            '"' +
            '(' +
                '(?:' +
                    '\\\\[\\s\\S]' +
                    '|' +
                    '[^"]' +
                ')+' +
            ')' +
            '"' +
            '|' +
            '\'' +
            '(' +
                '(?:' +
                    '\\\\[\\s\\S]' +
                    '|' +
                    '[^\']' +
                ')+' +
            ')' +
            '\'' +
            '|' +
            '(' +
                '(?:' +
                    '\\\\[\\s\\S]' +
                    '|' +
                    '[^"\'\\s]' +
                ')+' +
            ')' +
        ')' +
    ')?' +
    '\\s*',
    'gi'
);

/**
 * Create an expression which matches a marker.
 *
 * @param {string} name - Plug-in name.
 * @return {RegExp}
 */
function marker(name) {
    return new RegExp(
        '(' +
            '\\s*' +
            '<!--' +
            '\\s*' +
            '(' +
                name +
            ')' +
            '\\s*' +
            '(' +
                'start' +
                '|' +
                'end' +
            ')?' +
            '\\s*' +
            '(' +
                '[\\s\\S]*?' +
            ')' +
            '\\s*' +
            '-->' +
            '\\s*' +
        ')'
    );
}

/**
 * Parse `value` into an object.
 *
 * @param {string} value - HTML comment.
 * @return {Object}
 */
function parameters(value) {
    var attributes = {};

    value.replace(PARAMETERS, function ($0, $1, $2, $3, $4) {
        var result = $2 || $3 || $4 || '';

        if (result === 'true' || result === '') {
            result = true;
        } else if (result === 'false') {
            result = false;
        } else if (!isNaN(result)) {
            result = Number(result);
        }

        attributes[$1] = result;

        return '';
    });

    return attributes;
}

/**
 * Factory to test if `node` matches `settings`.
 *
 * @param {Object} settings - Configuration.
 * @param {Function} callback - Invoked iwht a matching
 *   HTML node.
 * @return {Function}
 */
function testFactory(settings, callback) {
    var name = settings.name;
    var expression = marker(name);

    /**
     * Test if `node` matches the bound settings.
     *
     * @param {MDASTNode} node - Node to check.
     * @param {Parser|Compiler} [context] - Context class.
     * @return {Object?}
     */
    function test(node, context) {
        var value;
        var match;
        var result;

        if (!node || node.type !== 'html') {
            return null;
        }

        value = node.value;
        match = value.match(expression);

        if (
            !match ||
            match[1].length !== value.length ||
            match[2] !== settings.name
        ) {
            return null;
        }

        result = {
            'type': match[3] || 'marker',
            'attributes': match[4] || '',
            'parameters': parameters(match[4] || ''),
            'node': node
        };

        if (callback) {
            callback(result, context);
        }

        return result;
    }

    return test;
}

/**
 * Parse factory.
 *
 * @param {Function} tokenize - Previous parser.
 * @param {Object} settings - Configuration.
 */
function parse(tokenize, settings) {
    var callback = settings.onparse;
    var test = testFactory(settings, function (result, context) {
        if (result.type === 'marker') {
            callback(result, context);
        }
    });

    /**
     * Parse HTML.
     *
     * @return {Node}
     */
    function replacement() {
        var node = tokenize.apply(this, arguments);

        test(node, this);

        return node;
    }

    replacement.locator = tokenize.locator;

    return replacement;
}

/**
 * Stringify factory.
 *
 * @param {Function} compile - Previous compiler.
 * @param {Object} settings - Configuration.
 */
function stringify(compile, settings) {
    var callback = settings.onstringify;
    var test = testFactory(settings, function (result, context) {
        if (result.type === 'marker') {
            callback(result, context);
        }
    });

    /**
     * Stringify HTML.
     *
     * @param {MDASTHTMLNode} node - HTML node.
     * @return {string}
     */
    return function (node) {
        test(node, this);

        return compile.apply(this, arguments);
    };
}

/**
 * Run factory.
 *
 * @param {Object} settings - Configuration.
 */
function run(settings) {
    var callback = settings.onrun;
    var test = testFactory(settings);
    var nodes = [];
    var start = null;
    var scope = null;
    var level = 0;
    var position;

    /**
     * Gather one dimensional zones.
     *
     * Passed intto `visit`.
     *
     * @param {MDASTNode} node - node to check.
     * @param {number} index - Position of `node` in
     *   `parent`.
     * @param {MDASTNode} parent - Parent of `node`.
     */
    function gather(node, index, parent) {
        var result = test(node);
        var type = result && result.type;

        if (scope && parent === scope) {
            if (type === 'start') {
                level++;
            }

            if (type === 'end') {
                level--;
            }

            if (type === 'end' && level === 0) {
                nodes = callback(start, nodes, result, {
                    'start': index - nodes.length - 1,
                    'end': index,
                    'parent': scope
                });

                if (nodes) {
                    splice.apply(
                        scope.children, [position, index + 1].concat(nodes)
                    );
                }

                start = null;
                scope = null;
                position = null;
                nodes = [];
            } else {
                nodes.push(node);
            }
        }

        if (!scope && type === 'start') {
            level = 1;
            position = index;
            start = result;
            scope = parent;
        }
    }

    /**
     * Modify AST.
     *
     * @param {MDASTNode} node - Root node.
     */
    return function (node) {
        visit(node, gather);
    };
}

/**
 * Modify mdast to invoke callbacks when HTML commnts are
 * found.
 *
 * @param {MDAST} mdast - Instance.
 * @param {Object?} [options] - Configuration.
 * @return {Function?}
 */
function attacher(mdast, options) {
    var parser = mdast.Parser.prototype;
    var blockTokenizers = parser.blockTokenizers;
    var inlineTokenizers = parser.inlineTokenizers;
    var stringifiers = mdast.Compiler.prototype;

    if (options.onparse) {
        blockTokenizers.html = parse(blockTokenizers.html, options);
        inlineTokenizers.tag = parse(inlineTokenizers.tag, options);
    }

    if (options.onstringify) {
        stringifiers.html = stringify(stringifiers.html, options);
    }

    if (options.onrun) {
        return run(options);
    }

    return null;
}

/**
 * Wrap `zone` to be passed into `mdast.use()`.
 *
 * Reason for this is that **mdast** only allows a single
 * function to be `use`d once.
 *
 * @param {Object} options - Plugin configuration.
 * @return {Function}
 */
function wrapper(options) {
    if (!options || !options.name) {
        throw new Error('Missing `name` in `options`');
    }

    return function (mdast) {
        return attacher(mdast, options);
    };
}

/*
 * Expose.
 */

module.exports = wrapper;

},{"unist-util-visit":3}],3:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer. All rights reserved.
 * @module unist:util:visit
 * @fileoverview Utility to recursively walk over unist nodes.
 */

'use strict';

/**
 * Walk forwards.
 *
 * @param {Array.<*>} values - Things to iterate over,
 *   forwards.
 * @param {function(*, number): boolean} callback - Function
 *   to invoke.
 * @return {boolean} - False if iteration stopped.
 */
function forwards(values, callback) {
    var index = -1;
    var length = values.length;

    while (++index < length) {
        if (callback(values[index], index) === false) {
            return false;
        }
    }

    return true;
}

/**
 * Walk backwards.
 *
 * @param {Array.<*>} values - Things to iterate over,
 *   backwards.
 * @param {function(*, number): boolean} callback - Function
 *   to invoke.
 * @return {boolean} - False if iteration stopped.
 */
function backwards(values, callback) {
    var index = values.length;
    var length = -1;

    while (--index > length) {
        if (callback(values[index], index) === false) {
            return false;
        }
    }

    return true;
}

/**
 * Visit.
 *
 * @param {Node} tree - Root node
 * @param {string} [type] - Node type.
 * @param {function(node): boolean?} callback - Invoked
 *   with each found node.  Can return `false` to stop.
 * @param {boolean} [reverse] - By default, `visit` will
 *   walk forwards, when `reverse` is `true`, `visit`
 *   walks backwards.
 */
function visit(tree, type, callback, reverse) {
    var iterate;
    var one;
    var all;

    if (typeof type === 'function') {
        reverse = callback;
        callback = type;
        type = null;
    }

    iterate = reverse ? backwards : forwards;

    /**
     * Visit `children` in `parent`.
     */
    all = function (children, parent) {
        return iterate(children, function (child, index) {
            return child && one(child, index, parent);
        });
    };

    /**
     * Visit a single node.
     */
    one = function (node, index, parent) {
        var result;

        index = index || (parent ? 0 : null);

        if (!type || node.type === type) {
            result = callback(node, index, parent || null);
        }

        if (node.children && result !== false) {
            return all(node.children, node);
        }

        return result;
    };

    one(tree);
}

/*
 * Expose.
 */

module.exports = visit;

},{}]},{},[1])(1)
});