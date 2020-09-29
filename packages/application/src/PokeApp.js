import { LitElement, ScopedElementsMixin, LocalizeMixin, html, ChiHeader, ChiIcon } from 'chi-wc';
import { Router } from '@vaadin/router';

import { pokeAppStyle } from './PokeApp.style.js';
import logo from '../assets/images/pokeapp.svg.js';

/** i18n namespace */
const namespace = 'pokeapp';

export class PokeApp extends ScopedElementsMixin(LocalizeMixin(LitElement)) {
  static get styles() {
    return [super.styles || [], pokeAppStyle];
  }

  /** @override */
  static get scopedElements() {
    return {
      'chi-header': ChiHeader,
      'chi-icon': ChiIcon,
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

  static get routes() {
    return [
      {
        path: '/',
        component: 'feat-list-pokemons',
        action: async () => import('@pokeapp/feat-list-pokemons/feat-list-pokemons.js'),
      },
    ];
  }

  firstUpdated() {
    super.firstUpdated();

    if (!this.router) {
      this.router = new Router(this.shadowRoot.querySelector('.pokeapp__content'));
      this.router.setRoutes(this.constructor.routes);
    }
  }

  render() {
    return html`
      <div class="pokeapp__container">
        <chi-header class="pokeapp__header">
          <chi-icon slot="header-brand-logo" class="logo" .svg="${logo}"></chi-icon>
        </chi-header>
        <section class="pokeapp__content"></section>
      </div>
    `;
  }
}
