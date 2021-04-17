import { LitElement, ScopedElementsMixin, html } from 'chi-wc/core';
import { LocalizeMixin } from 'chi-wc/localize';
import { ChiButton } from 'chi-wc/button';
import { FeatPokemonDetails } from '@pokeapp/feat-pokemon-details';
import { NavigateToPokemonSearchEvent } from '../events/NavigateToPokemonSearchEvent.js';
import { pokeAppPokemonDetailsStyle } from './PokeAppPokemonDetails.style.js';
import { namespace } from '../namespace.js';

export class PokeAppPokemonDetails extends ScopedElementsMixin(LocalizeMixin(LitElement)) {
  /** @override */
  static get styles() {
    return [super.styles || [], pokeAppPokemonDetailsStyle];
  }

  /** @override */
  static get scopedElements() {
    return {
      'chi-button': ChiButton,
      'feat-pokemon-details': FeatPokemonDetails,
    };
  }

  /** @override */
  static get properties() {
    return {
      location: { type: Object },
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
              return import('../../assets/translations/es-ES.js');
            default:
              return import('../../assets/translations/en-GB.js');
          }
        },
      },
    ];
  }

  /**
   * Handles the click to go to search.
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  _handleGoToSearchClicked() {
    this.dispatchEvent(new NavigateToPokemonSearchEvent());
  }

  /** @override */
  render() {
    const {
      params: { name },
    } = this.location;

    return html`
      <div class="header">
        <chi-button
          class="search-button"
          data-testid="search-button"
          @click="${() => this._handleGoToSearchClicked()}"
          >＜ ${this.msgLit(`${namespace}:search`)}</chi-button
        >
      </div>
      <feat-pokemon-details data-testid="feature" name="${name}"></feat-pokemon-details>
    `;
  }
}
