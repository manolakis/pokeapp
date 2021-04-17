import { LitElement, ScopedElementsMixin, html, nothing } from 'chi-wc/core';
import { LocalizeMixin } from 'chi-wc/localize';
import { ChiButton } from 'chi-wc/button';
import { ChiInput } from 'chi-wc/input';

import { featListPokemonStyle } from './FeatListPokemons.style.js';
import { getPokemonNamesAction } from './actions/getPokemonNamesAction.js';
import { PokemonSelectedEvent } from './PokemonSelectedEvent.js';
import { PokemonCard } from './components/pokemon-card/PokemonCard.js';
import { namespace } from './namespace.js';

export class FeatListPokemons extends ScopedElementsMixin(LocalizeMixin(LitElement)) {
  /** @override */
  static get styles() {
    return [super.style || [], featListPokemonStyle];
  }

  /** @override */
  static get scopedElements() {
    return {
      'chi-button': ChiButton,
      'chi-input': ChiInput,
      'pokemon-card': PokemonCard,
    };
  }

  /** @override */
  static get properties() {
    return {
      search: { type: String },
      pokemonNames: { type: Array },
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

  /** Constructor a FeatListPokemon instance. */
  constructor() {
    super();

    this.search = '';
    this.pokemonNamesLoading = this._startLoadingPokemonNames();
  }

  /** Start loading the pokemon list */
  async _startLoadingPokemonNames() {
    this.pokemonNames = await getPokemonNamesAction();
  }

  /**
   * Dispatch a PokemonSelectedEvent.
   *
   * @param {string} pokemonName
   * @return {Promise<void>}
   * @private
   */
  async _handlePokemonSelected(pokemonName) {
    this.dispatchEvent(new PokemonSelectedEvent(pokemonName));
  }

  /** @override */
  render() {
    return html`
      <div>
        <chi-input
          data-id="search"
          label="${this.msgLit(`${namespace}:search.label`)}"
          placeholder="${this.msgLit(`${namespace}:search.placeholder`)}"
          @model-value-changed=${({ target }) => {
            this.search = target.modelValue.replace(/-/g, ' ').toLowerCase();
          }}
        ></chi-input>
      </div>
      <ul class="pokemon-list">
        ${this.pokemonNames && this.search.length >= 3
          ? this.pokemonNames
              .filter(name =>
                this.search
                  .split(/\s/)
                  .reduce((acc, part) => acc && name.toLowerCase().indexOf(part) !== -1, true),
              )
              .map(
                pokemonName =>
                  html`
                    <li>
                      <pokemon-card
                        name="${pokemonName}"
                        @click="${() => this._handlePokemonSelected(pokemonName)}"
                      ></pokemon-card>
                    </li>
                  `,
              )
          : nothing}
      </ul>
    `;
  }
}
