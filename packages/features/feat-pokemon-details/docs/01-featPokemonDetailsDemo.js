import { html } from 'chi-wc/core';
import { FeatPokemonDetails } from '../src/FeatPokemonDetails.js';

customElements.define('feat-pokemon-details', FeatPokemonDetails);

export const renderPokemonDetails = () =>
  html` <feat-pokemon-details name="pikachu"></feat-pokemon-details> `;
