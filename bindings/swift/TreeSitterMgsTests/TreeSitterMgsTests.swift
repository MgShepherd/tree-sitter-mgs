import XCTest
import SwiftTreeSitter
import TreeSitterMgs

final class TreeSitterMgsTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_mgs())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Mgs grammar")
    }
}
