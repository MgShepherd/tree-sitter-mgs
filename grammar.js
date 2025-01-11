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
    source_file: ($) => $.block,
    block: ($) => seq("{", repeat(seq($._statement, ";")), "}"),

    _statement: ($) =>
      choice(
        $.declaration_statement,
        $.assignment_statement,
        $.print_statement,
        $.while_statement,
        $.if_statement,
      ),
    declaration_statement: ($) =>
      seq($.datatype, $.identifier, $.assignment_operator, $._expression),
    assignment_statement: ($) =>
      seq($.identifier, $.assignment_operator, $._expression),
    print_statement: ($) => seq("print", $.string_value),
    while_statement: ($) => seq("while", $.comparison_expression, $.block),
    if_statement: ($) =>
      seq(
        "if",
        $.comparison_expression,
        $.block,
        repeat($.elif_statement),
        optional($.else_statement),
      ),
    elif_statement: ($) => seq("elif", $.comparison_expression, $.block),
    else_statement: ($) => seq("else", $.block),

    _expression: ($) =>
      choice(
        $.value_expression,
        $.arithmetic_expression,
        $.comparison_expression,
      ),
    value_expression: ($) => choice($._value, $.identifier),
    arithmetic_expression: ($) =>
      prec.left(1, seq($._expression, $.arithmetic_operator, $._expression)),
    comparison_expression: ($) =>
      prec.left(1, seq($._expression, $.comparison_operator, $._expression)),

    _value: ($) => choice($.numeric_value, $.string_value),
    numeric_value: ($) => /[0-9]+/,
    string_value: ($) => /"[a-zA-Z0-9 ]+"/,

    datatype: ($) => "i16",
    identifier: ($) => /[a-z]+/,
    assignment_operator: ($) => choice("=", "+=", "-=", "*=", "/="),
    arithmetic_operator: ($) => choice("+", "-", "/", "*"),
    comparison_operator: ($) => choice("<", ">", "<=", ">=", "=="),
  },
});
