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

    _statement: ($) => choice($.assignment_statement, $.print_statement),
    assignment_statement: ($) =>
      seq($.datatype, $.identifier, $.assignment_operator, $._expression),
    print_statement: ($) => seq("print", $.string_value),

    _expression: ($) => choice($.value_expression, $.arithmetic_expression),
    value_expression: ($) => $.numeric_value,
    arithmetic_expression: ($) =>
      prec.left(1, seq($._expression, $.arithmetic_operator, $._expression)),

    datatype: ($) => "i16",
    identifier: ($) => /[a-z]+/,
    numeric_value: ($) => /[0-9]+/,
    string_value: ($) => /"[a-zA-Z0-9 ]+"/,
    assignment_operator: ($) => choice("=", "+=", "-=", "*=", "/="),
    arithmetic_operator: ($) => choice("+", "-", "/", "*"),
  },
});
