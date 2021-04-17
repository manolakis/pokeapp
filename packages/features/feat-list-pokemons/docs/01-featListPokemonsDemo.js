import { html } from 'chi-wc/core';
import { FeatListPokemons } from '../src/FeatListPokemons.js';

if (!customElements.get('feat-list-pokemons')) {
  customElements.define('feat-list-pokemons', FeatListPokemons);
}

export const renderFeatListPokemons = () => html` <feat-list-pokemons></feat-list-pokemons> `;
