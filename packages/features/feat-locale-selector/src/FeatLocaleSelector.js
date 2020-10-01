import { html, LitElement, LocalizeMixin, localize, ScopedElementsMixin, ChiButton } from 'chi-wc';

import { featLocaleSelectorStyle } from './FeatLocaleSelector.style.js';
import { namespace } from './namespace.js';

import flags from '../assets/translations/flags.js';

export class FeatLocaleSelector extends ScopedElementsMixin(LocalizeMixin(LitElement)) {
  /** @override */
  static get styles() {
    return [super.style || [], featLocaleSelectorStyle];
  }

  /** @override */
  static get scopedElements() {
    return {
      'chi-button': ChiButton,
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

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }

    this.langs = Object.keys(flags);
    const [defaultLang] = this.langs;

    localize.locale = defaultLang;
  }

  /**
   * Handles the click on a flag.
   * @param {string} newLang
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  _handleClickOnFlag(newLang) {
    localize.locale = newLang;
  }

  /** @override */
  render() {
    const currentLang = localize.locale;
    const alternativeFlag = this.langs.find(lang => lang !== currentLang);

    return html`<chi-button
      aria-label="${this.msgLit(`${namespace}:label`, {
        lang: this.msgLit(`${namespace}:locales.${alternativeFlag}`),
      })}"
      class="flag"
      data-lang="${alternativeFlag}"
      @click=${() => this._handleClickOnFlag(alternativeFlag)}
      >${flags[alternativeFlag]}</chi-button
    >`;
  }
}
