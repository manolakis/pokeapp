import { LitElement, ScopedElementsMixin, html, until } from 'chi-wc/core';
import { LocalizeMixin } from 'chi-wc/localize';
import { ChiIcon } from 'chi-wc/icon';
import { getPokemonAction } from '../../actions/getPokemonAction.js';
import { pokemonCardStyle } from './PokemonCard.style.js';
import { namespace } from '../../namespace.js';
import notFoundIcon from '../../../assets/images/pokeball.svg.js';

/**
 * Replace dashes by spaces.
 * @param {string} name
 * @return {string}
 */
const dashesToSpaces = name => name.replace(/-/g, ' ');

export class PokemonCard extends ScopedElementsMixin(LocalizeMixin(LitElement)) {
  /** @override */
  static get styles() {
    return [super.style || [], pokemonCardStyle];
  }

  /** @override */
  static get scopedElements() {
    return {
      'chi-icon': ChiIcon,
    };
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
      <button class="button">
        <div class="image">${until(this.renderImage(), this.msgLit(`${namespace}:loading`))}</div>
        <div class="name">${dashesToSpaces(this.name)}</div>
      </button>
    `;
  }
}
