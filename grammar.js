/**
 * @file Treesitter for MGS lang
 * @author Michael Shepherd <michaelshep1504@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "mgs",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
