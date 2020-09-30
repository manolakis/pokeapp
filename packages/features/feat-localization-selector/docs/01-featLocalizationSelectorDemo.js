import { html } from 'chi-wc';
import { FeatLocalizationSelector } from '../src/FeatLocalizationSelector.js';

if (!customElements.get('feat-localization-selector')) {
  customElements.define('feat-localization-selector', FeatLocalizationSelector);
}

export const renderLocalizationSelector = () => {
  return html` <feat-localization-selector></feat-localization-selector> `;
};
