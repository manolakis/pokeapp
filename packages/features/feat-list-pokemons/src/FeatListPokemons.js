import { LitElement, LocalizeMixin, html, nothing } from 'chi-wc';

import { featListPokemonStyle } from './FeatListPokemons.style.js';
import { getPokemonsAction } from './actions/getPokemonsAction.js';

import 'chi-wc/chi-button.js';
import 'chi-wc/chi-input.js';

/** i18n namespace */
const namespace = 'feat-list-pokemon';

export class FeatListPokemons extends LocalizeMixin(LitElement) {
  /** @override */
  static get styles() {
    return [super.style || [], featListPokemonStyle];
  }

  /** @override */
  static get properties() {
    return {
      filter: { type: String },
      pokemons: { type: Array },
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

    this.filter = '';
    this.pokemonsLoading = this._startLoadingPokemons();
  }

  async _startLoadingPokemons() {
    this.pokemons = await getPokemonsAction();
  }

  /** @override */
  render() {
    return html`
      <div>
        <chi-input
          placeholder="${this.msgLit(`${namespace}:placeholder`)}"
          @model-value-changed=${({ target }) => {
            this.filter = target.modelValue;
          }}
        ></chi-input>
      </div>
      <ul class="pokemon-list">
        ${this.pokemons && this.filter.length >= 3
          ? this.pokemons
              .filter(({ name }) => name.indexOf(this.filter) !== -1)
              .map(pokemon => html` <li>${pokemon.name}</li> `)
          : nothing}
      </ul>
    `;
  }
}
