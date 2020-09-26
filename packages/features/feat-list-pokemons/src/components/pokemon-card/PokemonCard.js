import { LitElement, LocalizeMixin, html, until } from 'chi-wc';
import { pokemonCardStyle } from './PokemonCard.style.js';
import { getPokemonAction } from '../../actions/getPokemonAction.js';
import notFoundIcon from './pokeball.svg.js';
import { namespace } from '../../namespace.js';

import 'chi-wc/chi-icon.js';

/**
 * Replace dashes by spaces.
 * @param {string} name
 * @return {string}
 */
const dashesToSpaces = name => name.replaceAll('-', ' ');

export class PokemonCard extends LocalizeMixin(LitElement) {
  /** @override */
  static get styles() {
    return [super.style || [], pokemonCardStyle];
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
              return import(`../../../assets/translations/es-ES.js`);
            default:
              return import(`../../../assets/translations/en-GB.js`);
          }
        },
      },
    ];
  }

  /** @override */
  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }

    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabIndex', 0);
    }

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button');
    }
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
   * Render the pokemon image
   * @return {Promise<TemplateResult>}
   */
  async renderImage() {
    await this.pokemonLoading;

    return this.pokemon.sprite
      ? html`
          <img
            alt="${this.msgLit(`${namespace}:imageAlt`, {
              name: dashesToSpaces(this.pokemon.name),
            })}"
            src="${this.pokemon.sprite}"
          />
        `
      : html` <chi-icon class="not-found" .svg="${notFoundIcon}"></chi-icon> `;
  }

  /** @override */
  render() {
    return html`
      <div class="image">${until(this.renderImage(), html` Loading... `)}</div>
      <div class="name">${dashesToSpaces(this.name)}</div>
    `;
  }
}
