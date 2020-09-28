const copy = require('rollup-plugin-copy');

module.exports = {
  stories: [
    '../packages/**/!(node_modules)/**/README.md',
    '../packages/**/!(node_modules)/**/docs/*.md',
    '../packages/**/!(node_modules)/**/docs/!(assets)**/*.md',
    '../README.md',
  ],
  addons: [
    'storybook-prebuilt/addon-docs/register.js',
    'storybook-prebuilt/addon-actions/register.js',
    'storybook-prebuilt/addon-knobs/register.js',
    'storybook-prebuilt/addon-a11y/register.js',
    'storybook-prebuilt/addon-backgrounds/register.js',
    'storybook-prebuilt/addon-links/register.js',
    'storybook-prebuilt/addon-viewport/register.js',
  ],
  rollup: config => {
    config.plugins.push(
      copy({
        targets: [
          {
            src: 'packages/application/assets/images/**/*',
            dest: 'storybook-static/assets/images/',
          },
        ],
        flatten: false,
      }),
    );
    config.plugins.push({
      name: 'resolve / to process.cwd',
      resolveId(source) {
        if (source.startsWith('/')) {
          return process.cwd() + source;
        }
        return null;
      },
    });
  },
  esDevServer: {
    nodeResolve: true,
    watch: true,
    open: true,
  },
};
