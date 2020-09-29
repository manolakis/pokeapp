import { LitElement, ScopedElementsMixin, LocalizeMixin, html, ChiHeader, ChiIcon } from 'chi-wc';
import { Router } from '@vaadin/router';

import { NavigationEvent } from './events/NavigationEvent.js';
import { pokeAppStyle } from './PokeApp.style.js';
import logo from '../assets/images/pokeapp.svg.js';
import { NavigateToPokemonDetailsEvent } from './events/NavigateToPokemonDetailsEvent.js';

/** i18n namespace */
const namespace = 'pokeapp';

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
  _handleNavigationEvent(event) {
    if (this.router) {
      if (event instanceof NavigateToPokemonDetailsEvent) {
        this.__setRoute(
          this.router.urlForName('pokeapp-pokemon-details', {
            name: event.pokemonName,
          }),
        );
      }
    }
  }

  /**
   * Changes the windoe location.
   *
   * @param {string} newLocation
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  __setRoute(newLocation) {
    window.location = newLocation;
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
        </chi-header>
        <section class="pokeapp__content"></section>
      </div>
    `;
  }
}
