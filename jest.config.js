module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)x?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json"
    ],
    "moduleNameMapper": {
        "\\.(css|scss)$": "identity-obj-proxy"
    },
    "coverageDirectory": "<rootDir>/.jest/coverage",
    "coverageReporters": ["text", "cobertura", "lcov"],
};
