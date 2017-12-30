module.exports = {
    "root": true,
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "standard",
    "parserOptions": {
        "sourceType": "module",
        // "ecmaVersion": 6,
        // "ecmaFeatures": {
            // "impliedStrict": true,
        // }
    },
    "rules": {
        "indent": ["error", 2],
        "linebreak-style": ["error", "unix"],
        "semi": ["error", "never"]
    }
};