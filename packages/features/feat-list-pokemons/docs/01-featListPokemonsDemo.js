import { html } from 'chi-wc';
import { FeatListPokemons } from '../src/FeatListPokemons.js';

customElements.define('feat-list-pokemons', FeatListPokemons);

export const renderFeatListPokemons = () => html` <feat-list-pokemons></feat-list-pokemons> `;
