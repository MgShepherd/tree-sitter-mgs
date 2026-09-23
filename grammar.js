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
      $._code_block,
    ),

    _code_block: $ => seq(
      '{',
      repeat($._statement),
      '}',
    ),

    _statement: $ => choice(
      $.return_statement,
      $.declaration_statement,
      $.assignment_statement,
      $.if_block,
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

    _if_branch: $ => seq(
      'if',
      $._expr,
      $._code_block,
    ),

    _else_if_branch: $ => seq(
      'else',
      $._if_branch,
    ),

    _else_branch: $ => seq(
      'else',
      $._code_block,
    ),

    if_block: $ => seq(
      $._if_branch,
      repeat($._else_if_branch),
      optional($._else_branch),
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
      '<',
      '>',
      '<=',
      '>=',
    ),

    identifier: _ => /[a-zA-Z_]+[a-zA-Z0-9_]*/,

    numeric_lit: _ => /[+-]?[0-9]+/,

    bool_lit: _ => choice(
      'true',
      'false',
    ),
  }
});
