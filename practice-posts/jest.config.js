module.exports = {
    verbose: true,
    moduleFileExtensions: [
        'js',
        'jsx',
    ],
    moduleDirectories: [
        'node_modules',
    ],
    // setupFiles: [
    //     './test/jestsetup.js',
    // ],
    // snapshotSerializers: [
    //     'enzyme-to-json/serializer',
    // ],
    moduleNameMapper: {
        '^.+\\.(css|scss)$': 'identity-obj-proxy',
    },
}
