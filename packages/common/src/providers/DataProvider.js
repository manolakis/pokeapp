import { AjaxClass } from 'chi-wc';
import { CachedProviderMixin } from './CachedProviderMixin.js';

export const DataProvider = CachedProviderMixin(AjaxClass);
