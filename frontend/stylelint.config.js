module.exports = {
  extends: '@jetbrains/stylelint-config',
  rules: {
    'selector-max-specificity': [
      '0,3,0',
      {
        ignoreSelectors: [':global', ':local'],
      },
    ],
    'selector-type-no-unknown': [true, {ignore: ['custom-elements']}],
    'font-family-no-missing-generic-family-keyword': null,
  },
}
