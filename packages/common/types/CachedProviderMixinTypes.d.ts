import { Constructor } from '@open-wc/dedupe-mixin';
import { AxiosRequestConfig, AxiosPromise } from 'axios';
import { AjaxClass } from 'chi-wc';

declare class CachedProvider {
  private __cache: Map<string, AxiosPromise>;

  constructor(config: AxiosRequestConfig);

  /** @overrides */
  public request(config: AxiosRequestConfig): AxiosPromise;

  /** Invalidates the current cached queries. */
  public invalidateCache(): void;

  /**
   * Returns a cached query or executes and caches it for future references.
   */
  private __cachedRequest(config: AxiosRequestConfig): AxiosPromise;
}

declare function CachedProviderImplementation<T extends Constructor<AjaxClass>>(
  superclass: T,
): T & Constructor<CachedProvider> & typeof CachedProvider;

export type CachedProviderMixin = typeof CachedProviderImplementation;
