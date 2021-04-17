import { importMapsPlugin } from '@web/dev-server-import-maps';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { defaultReporter } from '@web/test-runner';
import { junitReporter } from '@web/test-runner-junit-reporter';

export default {
  nodeResolve: true,
  coverageConfig: {
    report: true,
    reportDir: 'coverage',
    threshold: {
      statements: 90,
      branches: 60,
      functions: 70,
      lines: 90,
    },
  },
  testFramework: {
    config: {
      timeout: 10000
    },
  },
  browsers: [
    playwrightLauncher({ product: 'firefox' }),
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'webkit' }),
  ],
  files: [
    'packages/*/test/**/*.test.js',
    'packages/*/test/**/*.test.html',
  ],
  reporters: [
    // use the default reporter only for reporting test progress
    defaultReporter({ reportTestResults: true, reportTestProgress: true }),
    junitReporter(),
  ],
  plugins: [importMapsPlugin()],
};
