import { html, LitElement, LocalizeMixin, nothing } from 'chi-wc';

import { featListPokemonStyle } from './FeatListPokemons.style.js';
import { getPokemonNamesAction } from './actions/getPokemonNamesAction.js';
import { namespace } from './namespace.js';

import 'chi-wc/chi-button.js';
import 'chi-wc/chi-input.js';
import './components/pokemon-card.js';

export class FeatListPokemons extends LocalizeMixin(LitElement) {
  /** @override */
  static get styles() {
    return [super.style || [], featListPokemonStyle];
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

  constructor() {
    super();

    this.search = '';
    this.pokemonNamesLoading = this._startLoadingPokemonNames();
  }

  /** Start loading the pokemon list */
  async _startLoadingPokemonNames() {
    this.pokemonNames = await getPokemonNamesAction();
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
            this.search = target.modelValue.replace(/-/g, ' ');
          }}
        ></chi-input>
      </div>
      <ul class="pokemon-list">
        ${this.pokemonNames && this.search.length >= 3
          ? this.pokemonNames
              .filter(name =>
                this.search
                  .split(/\s/)
                  .reduce((acc, part) => acc && name.indexOf(part) !== -1, true),
              )
              .map(
                pokemonName => html` <li><pokemon-card name="${pokemonName}"></pokemon-card></li> `,
              )
          : nothing}
      </ul>
    `;
  }
}
