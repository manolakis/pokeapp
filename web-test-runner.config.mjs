import { importMapsPlugin } from '@web/dev-server-import-maps';

export default {
  plugins: [importMapsPlugin()],
  concurrency: 4
};
