// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterMgs",
    products: [
        .library(name: "TreeSitterMgs", targets: ["TreeSitterMgs"]),
    ],
    dependencies: [
        .package(url: "https://github.com/ChimeHQ/SwiftTreeSitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterMgs",
            dependencies: [],
            path: ".",
            sources: [
                "src/parser.c",
                // NOTE: if your language has an external scanner, add it here.
            ],
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterMgsTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterMgs",
            ],
            path: "bindings/swift/TreeSitterMgsTests"
        )
    ],
    cLanguageStandard: .c11
)
