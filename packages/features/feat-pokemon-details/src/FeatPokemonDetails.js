import { html, LitElement, LocalizeMixin, until } from 'chi-wc';

import { featPokemonDetailsStyle } from './FeatPokemonDetails.style.js';
import { namespace } from './namespace.js';
import { getPokemonAction } from './actions/getPokemonAction.js';

import './components/pokemon-stats.js';

export class FeatPokemonDetails extends LocalizeMixin(LitElement) {
  /** @override */
  static get styles() {
    return [super.style || [], featPokemonDetailsStyle];
  }

  /** @override */
  static get properties() {
    return {
      name: { type: String },
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

  /** @override */
  update(changedProperties) {
    this.pokemonLoading = this._startLoadingPokemon();

    super.update(changedProperties);
  }

  /**
   * Starts loading the pokemon details.
   *
   * @return {Promise<void>}
   * @private
   */
  async _startLoadingPokemon() {
    this.pokemon = await getPokemonAction(this.name);
  }

  /**
   * Render the Pokemon details
   * @return {Promise<TemplateResult>}
   */
  async renderPokemonDetails() {
    await this.pokemonLoading;

    return html`
      <h1 class="title">${this.pokemon.name}</h1>
      <div class="container">
        <div class="image">
          <img
            alt="${this.msgLit(`${namespace}:pokemonImageAlt`, { name: this.pokemon.name })}"
            src="https://pokeres.bastionbot.org/images/pokemon/${this.pokemon.id}.png"
          />
        </div>
        <pokemon-stats .stats="${this.pokemon.stats}"></pokemon-stats>
      </div>
    `;
  }

  /** @override */
  render() {
    return html`${until(this.renderPokemonDetails(), html`loading...`)}`;
  }
}
