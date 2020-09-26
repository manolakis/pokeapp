import { dedupeMixin } from 'chi-wc';

/**
 * @typedef {import('../../types/CachedProviderMixinTypes').CachedProviderMixin} CachedProviderMixin
 */

/**
 * Obtains the cache key
 * @param {string} url
 * @param {object<string, *>>}params
 * @return {string}
 */
const getCacheKey = ({ url, params = {} } = {}) => {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    search.append(key, value);
  }

  return `${url}${search.toString()}`;
};

/**
 * CachedProviderMixin - To allow cache in provider requests
 * @type {CachedProviderMixin}
 */
const CachedProviderImplementation = superclass =>
  class CachedProvider extends superclass {
    constructor(config) {
      super(config);

      this.__cache = new Map();
    }

    request(config) {
      const { method } = config;

      return method.toLowerCase() === 'get' ? this.__cachedRequest(config) : super.request(config);
    }

    __cachedRequest(config) {
      const key = getCacheKey(config);

      if (!this.__cache.has(key)) {
        this.__cache.set(key, super.request(config));
      }

      return this.__cache.get(key);
    }

    invalidateCache() {
      this.__cache.clear();
    }
  };

/** @type {CachedProviderMixin} */
export const CachedProviderMixin = dedupeMixin(CachedProviderImplementation);
