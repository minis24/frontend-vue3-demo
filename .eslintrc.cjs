/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	root: true,
	env: {
		node: true,
	},
	'extends': [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript',
		'@vue/eslint-config-prettier/skip-formatting',
	],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: {
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/no-var-requires': 0,
		//'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 0,
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'eol-last': ['error', 'always',],
		'semi': ['error', 'always',],
		'quotes': [ 'error', 'single', { 'allowTemplateLiterals': true, },],
		'indent': ['error', 'tab', { 'SwitchCase': 1, },],
		'comma-dangle': ['error', {
			'arrays': 'always',
			'objects': 'always',
		},
		],
		'object-curly-spacing': ['error', 'always', { 'objectsInObjects': true, },],
		'arrow-parens': ['error', 'always',],
		'vue/v-on-style': ['error', 'longform',],
		'vue/v-bind-style': ['error', 'longform',],
		'vue/v-slot-style': ['error', 'longform',],
		'vue/prop-name-casing': ['error', 'camelCase',],
		'vue/no-child-content': ['error', {
			'additionalDirectives': ['text', 'html',], // checks v-foo directive
		},],
		'vue/no-v-text-v-html-on-component': 0,
		'vue/html-self-closing': [
			'error',
			{
				'html': {
					'void': 'always',
					'normal': 'always',
					'component': 'always',
				},
				'svg': 'always',
				'math': 'always',
			},
		],
		'vue/attribute-hyphenation': ['error', 'always',],
		'vue/html-quotes': ['error', 'double', { 'avoidEscape': true, },],
		'vue/attributes-order': [
			'error',
			{
				'order': [
					'GLOBAL',
					'OTHER_ATTR',
					'DEFINITION',
					'LIST_RENDERING',
					'CONDITIONALS',
					'RENDER_MODIFIERS',
					[
						'UNIQUE',
						'SLOT',
					],
					'TWO_WAY_BINDING',
					'OTHER_DIRECTIVES',
					'EVENTS',
					'CONTENT',
				],
				'alphabetical': false,
			},
		],
		'vue/max-attributes-per-line': [
			'error',
			{
				'singleline': 1,
				'multiline': {
					'max': 1,
				},
			},
		],
		'vue/html-indent': [
			'error',
			'tab',
			{
				'attribute': 1,
				'baseIndent': 1,
				'closeBracket': 0,
				'alignAttributesVertically': true,
			},
		],
	},
};
