import { CachedProviderMixin } from './CachedProviderMixin.js';

/**
 * Creates the URL
 * @param {string} baseURL
 * @param {url} url
 * @param {object<string, any>} params
 * @return {string}
 */
const getUrl = ({ baseURL, url, params = {} } = {}) => {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    search.append(key, value);
  }

  return `${baseURL}${url}?${search.toString()}`;
};

/**
 * Very basic Fetch provider that only supports GET requests.
 */
class FetchProvider {
  constructor(config) {
    this.__config = config;
  }

  async request(config) {
    const response = await fetch(getUrl({ ...this.__config, ...config }));

    return response.json();
  }
}

export const DataProvider = CachedProviderMixin(FetchProvider);
