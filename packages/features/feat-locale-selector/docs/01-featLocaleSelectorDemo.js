import { html } from 'chi-wc/core';
import { FeatLocaleSelector } from '../src/FeatLocaleSelector.js';

if (!customElements.get('feat-locale-selector')) {
  customElements.define('feat-locale-selector', FeatLocaleSelector);
}

export const renderLocaleSelector = () => html` <feat-locale-selector></feat-locale-selector> `;
