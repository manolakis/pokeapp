import { LitElement, ScopedElementsMixin, html } from 'chi-wc/core';
import { FeatListPokemons } from '@pokeapp/feat-list-pokemons';
import { NavigateToPokemonDetailsEvent } from '../events/NavigateToPokemonDetailsEvent.js';

export class PokeAppListPokemons extends ScopedElementsMixin(LitElement) {
  /** @override */
  static get scopedElements() {
    return {
      'feat-list-pokemons': FeatListPokemons,
    };
  }

  /**
   * Handles a selected pokemon event.
   *
   * @param {string} pokemonName
   * @private
   */
  _handlePokemonSelected({ pokemonName }) {
    this.dispatchEvent(new NavigateToPokemonDetailsEvent(pokemonName));
  }

  /** @override */
  render() {
    return html`
      <feat-list-pokemons
        @pokemon-selected="${event => this._handlePokemonSelected(event)}"
      ></feat-list-pokemons>
    `;
  }
}
