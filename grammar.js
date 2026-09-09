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
      $.assignment_statement,
    ),

    return_statement: $ => seq(
      'return',
      $._expr,
      ';',
    ),

    declaration_statement: $ => seq(
      $.identifier,
      ':',
      optional('var'),
      $.data_type,
      '=',
      $._expr,
      ';',
    ),

    assignment_statement: $ => seq(
      $.identifier,
      '=',
      $._expr,
      ';',
    ),

    _expr: $ => choice(
      $.term_expr,
      $.compound_expr,
    ),

    term_expr: $ => choice(
      $.identifier,
      $.numeric_lit,
      $.bool_lit,
    ),

    compound_expr: $ => seq(
      $.term_expr,
      $.op,
      $._expr,
    ),

    data_type: _ => choice(
      'i32',
      'bool',
    ),

    op: _ => choice(
      '+',
      '-',
    ),

    identifier: _ => /[a-zA-Z_]+[a-zA-Z0-9_]*/,

    numeric_lit: _ => /[+-]?[0-9]+/,

    bool_lit: _ => choice(
      'true',
      'false',
    ),
  }
});
