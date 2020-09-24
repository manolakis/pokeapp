import { LitElement, LocalizeMixin, html } from 'chi-wc';

import { pokeAppStyle } from './PokeApp.style.js';
import pokeball from '../assets/images/pokeball.svg.js';
import 'chi-wc/chi-icon.js';
import 'chi-wc/chi-header.js';

/** i18n namespace */
const namespace = 'pokeapp';

export class PokeApp extends LocalizeMixin(LitElement) {
  static get styles() {
    return [super.styles || [], pokeAppStyle];
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

  render() {
    return html`
      <div class="pokeapp__container">
        <chi-header
          class="pokeapp__header"
          application-title="${this.msgLit(`${namespace}:title`)}"
        >
          <chi-icon slot="header-brand-logo" class="pokeball" .svg="${pokeball}"></chi-icon>
        </chi-header>
        <section class="pokeapp__content"></section>
      </div>
    `;
  }
}
