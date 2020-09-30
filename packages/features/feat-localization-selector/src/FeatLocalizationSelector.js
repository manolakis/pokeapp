import {
  html,
  LitElement,
  LocalizeMixin,
  nothing,
  localize,
  ScopedElementsMixin,
  ChiButton,
} from 'chi-wc';

import { featLocalizationSelectorStyle } from './FeatLocalizationSelector.style.js';
import { namespace } from './namespace.js';

export const emojiFlags = {
  'en-GB': '🇬🇧',
  'es-ES': '🇪🇸',
};

export const defaultLangs = ['en-GB', 'es-ES'];

export class FeatLocalizationSelector extends ScopedElementsMixin(LocalizeMixin(LitElement)) {
  /** @override */
  static get styles() {
    return [super.style || [], featLocalizationSelectorStyle];
  }

  /** @override */
  static get scopedElements() {
    return {
      'chi-button': ChiButton,
    };
  }

  /** @override */
  static get properties() {
    return {
      ...super.properties,
      langs: { type: Array },
    };
  }

  /** @override */
  static get localizeNamespaces() {
    return [
      ...super.localizeNamespaces,
      {
        [namespace]: locale => {
          switch (locale) {
            case 'es-ES':
              return import(`../assets/translations/es-ES.js`);
            default:
              return import(`../assets/translations/en-GB.js`);
          }
        },
      },
    ];
  }

  constructor() {
    super();
    this.langs = defaultLangs;
    [this.currentLang] = defaultLangs;
    localize.locale = this.currentLang;
  }

  /** @override */
  render() {
    return this.langs && this.langs.length > 0
      ? html`<chi-button
          aria-label="${`${this.msgLit(`${namespace}:label`)} ${this.msgLit(
            `${namespace}:${this.getLangAlternative()}`,
          )}`}"
          class="flag"
          @click=${this.clickHandler}
          >${emojiFlags[this.getLangAlternative()]}</chi-button
        >`
      : nothing;
  }

  getLangAlternative() {
    return this.langs.find(lang => lang !== this.currentLang);
  }

  clickHandler() {
    this.currentLang = this.getLangAlternative();
    localize.locale = this.currentLang;
  }
}
