/**
 * @file Mgs grammar for tree-sitter
 * @author Michael Shepherd <michaelshep1504@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "mgs",

  rules: {
    source_file: $ => repeat($.function),

    function: $ => seq(
      'func',
      $.identifier,
      '(',
      ')',
      '->',
      $.data_type,
      '{',
      repeat($._statement),
      '}',
    ),

    _statement: $ => choice(
      $.return_statement,
      $.declaration_statement,
    ),

    return_statement: $ => seq(
      'return',
      $._expr,
      ';',
    ),

    declaration_statement: $ => seq(
      $.identifier,
      ':',
      $.data_type,
      '=',
      $._expr,
      ';',
    ),

    _expr: $ => choice(
      $.identifier,
      $.numeric_lit,
    ),

    data_type: _ => choice(
      'i32',
    ),

    identifier: _ => /[a-zA-Z]+[a-zA-Z0-9_]*/,

    numeric_lit: _ => /[0-9]+/,
  }
});
