import { LitElement, LocalizeMixin, html } from 'chi-wc';
import { pokeAppStyle } from './PokeApp.style.js';
import pokeball from '../assets/images/pokeball.svg.js';
import 'chi-wc/chi-icon.js';
import 'chi-wc/chi-header.js';

/**
 * Default scope for i18n messages
 * @type {string}
 */
const MSG_SCOPE = 'pokeapp';

/**
 * Adds the default scope to the key.
 *
 * @param {string} k
 * @returns {string}
 */
const key = k => `${MSG_SCOPE}:${k}`;

export class PokeApp extends LocalizeMixin(LitElement) {
  static get localizeNamespaces() {
    return [
      ...super.localizeNamespaces,
      {
        [MSG_SCOPE]: locale => import(`../assets/translations/${locale}.js`),
      },
    ];
  }

  static get styles() {
    return [super.styles || [], pokeAppStyle];
  }

  render() {
    return html`
      <div class="pokeapp__container">
        <chi-header class="pokeapp__header" application-title="${this.msgLit(key('title'))}">
          <chi-icon slot="header-brand-logo" class="pokeball" .svg="${pokeball}"></chi-icon>
        </chi-header>
        <section class="pokeapp__content"></section>
      </div>
    `;
  }
}
