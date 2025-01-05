package tree_sitter_mgs_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_mgs "github.com/mgshepherd/tree-sitter-mgs/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_mgs.Language())
	if language == nil {
		t.Errorf("Error loading Mgs grammar")
	}
}
