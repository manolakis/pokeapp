import { html } from 'chi-wc';
import { FeatLocaleSelector } from '../src/FeatLocaleSelector.js';

if (!customElements.get('feat-locale-selector')) {
  customElements.define('feat-locale-selector', FeatLocaleSelector);
}

export const renderLocaleSelector = () => {
  return html` <feat-locale-selector></feat-locale-selector> `;
};
