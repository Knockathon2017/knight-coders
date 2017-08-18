module.exports = {
    "globals": {
      "expect": 0,
      "sinon": 0
    },
    "env": {
      "browser": true,
      "node": true,
      "mocha": true
    },
    "extends": "airbnb-base",
    "rules": {
      "brace-style": [0],
      "comma-dangle":  [2, "never"],
      "consistent-return": [0],
      "arrow-body-style": [1, "as-needed"],
      "no-underscore-dangle": [2, { "allow": ["_id", "_"] }],
      "import/no-unresolved": [0],
      "max-len": [2, 180,
        {
          "ignoreComments": true,
          "ignoreTrailingComments": true,
          "ignoreUrls": true,
          "ignoreStrings": true,
          "ignoreTemplateLiterals": true
        }
      ],
      "no-param-reassign": 0,
      "requireTrailingComma": 0,
      "linebreak-style": 0,
      "no-console": [0],
      "consistent-return": [0],
      "strict": [0, "global"]
    }
};
