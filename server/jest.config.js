// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
	// Automatically clear mock calls and instances between every test
	clearMocks: true,

	// The directory where Jest should output its coverage files
	coverageDirectory: "coverage",

	// A set of global variables that need to be available in all test environments
	globals: {
		'ts-jest': {
			tsConfig: './__tests__/tsconfig.json'
		}
	},

	// A preset that is used as a base for Jest's configuration
	preset: 'ts-jest',

	// The test environment that will be used for testing
	testEnvironment: "node",
};
