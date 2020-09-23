import { dedupeMixin } from 'chi-wc';

/**
 * @typedef {import('axios').AxiosRequestConfig} AxiosRequestConfig
 * @typedef {import('axios').AxiosResponse} AxiosResponse
 */

const getKey = ({ url, params = {} } = {}) => {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    search.append(key, value);
  }

  return `${url}${search.toString()}`;
};

const CachedProviderImplementation = superclass =>
  class CachedProvider extends superclass {
    constructor(config) {
      super(config);

      /** @type {Map<string, AxiosResponse>} */
      this.cache = new Map();
    }

    /** @override */
    request(config) {
      const { method } = config;

      return method.toLowerCase() === 'get' ? this.__cachedRequest(config) : super.request(config);
    }

    /**
     * Returns a cached query or executes and caches it for future references.
     * @param {AxiosRequestConfig} config
     * @return {AxiosResponse}
     * @private
     */
    __cachedRequest(config) {
      const key = getKey(config);

      if (!this.cache.has(key)) {
        this.cache.set(key, super.request(config));
      }

      return this.cache.get(key);
    }

    /**
     * Invalidates the current cache.
     */
    invalidateCache() {
      this.cache.clear();
    }
  };

export const CachedProviderMixin = dedupeMixin(CachedProviderImplementation);
