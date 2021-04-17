import { LitElement, ScopedElementsMixin, html } from 'chi-wc/core';
import { LocalizeMixin } from 'chi-wc/localize';
import { ChiHeader } from 'chi-wc/header';
import { ChiIcon } from 'chi-wc/icon';
import { FeatLocaleSelector } from '@pokeapp/feat-locale-selector';
import { Router } from '@vaadin/router';

import logo from '../assets/images/pokeapp.svg.js';
import { NavigationEvent } from './events/NavigationEvent.js';
import { pokeAppStyle } from './PokeApp.style.js';
import { namespace } from './namespace.js';

export class PokeApp extends ScopedElementsMixin(LocalizeMixin(LitElement)) {
  /** @override */
  static get styles() {
    return [super.styles || [], pokeAppStyle];
  }

  /** @override */
  static get scopedElements() {
    return {
      'chi-header': ChiHeader,
      'chi-icon': ChiIcon,
      'feat-locale-selector': FeatLocaleSelector,
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
              return import('../assets/translations/es-ES.js');
            default:
              return import('../assets/translations/en-GB.js');
          }
        },
      },
    ];
  }

  /**
   * Returns the routes config for Vaadin router.
   *
   * @return {{
   *   path: string,
   *   component: string,
   *   action: (function(): Promise<*>)
   * }[]}
   */
  static get routes() {
    return [
      {
        path: '/',
        component: 'pokeapp-list-pokemons',
        action: async () => import('./components/pokeapp-list-pokemons.js'),
      },
      {
        path: '/:name',
        component: 'pokeapp-pokemon-details',
        action: async () => import('./components/pokeapp-pokemon-details.js'),
      },
    ];
  }

  /** Creates an instance. */
  constructor() {
    super();

    this._handleNavigationEvent = this._handleNavigationEvent.bind(this);
  }

  /** @override */
  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }

    this.addEventListener(NavigationEvent.eventName, this._handleNavigationEvent);
  }

  /** @override */
  disconnectedCallback() {
    this.removeEventListener(NavigationEvent.eventName, this._handleNavigationEvent);

    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
  }

  /**
   * Handles the navigation events.
   * @param {typeof NavigationEvent} event
   * @private
   */
  _handleNavigationEvent({ details: { url, params } }) {
    if (this.router) {
      this.__setRoute(this.router.urlForName(url, params));
    }
  }

  /**
   * Changes the route.
   *
   * @param {string} newLocation
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  __setRoute(newLocation) {
    Router.go(newLocation);
  }

  /** @override */
  firstUpdated() {
    super.firstUpdated();

    if (!this.router) {
      this.router = new Router(this.shadowRoot.querySelector('.pokeapp__content'));
      this.router.setRoutes(this.constructor.routes);
    }
  }

  /** @override */
  render() {
    return html`
      <div class="pokeapp__container">
        <chi-header class="pokeapp__header">
          <chi-icon slot="header-brand-logo" class="logo" .svg="${logo}"></chi-icon>
          <feat-locale-selector slot="header-right"></feat-locale-selector>
        </chi-header>
        <section class="pokeapp__content"></section>
      </div>
    `;
  }
}
