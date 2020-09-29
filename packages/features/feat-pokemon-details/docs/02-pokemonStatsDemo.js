import { html } from 'chi-wc';
import { PokemonStats } from '../src/components/pokemon-stats/PokemonStats.js';

if (!customElements.get('pokemon-stats')) {
  customElements.define('pokemon-stats', PokemonStats);
}

export const renderPokemonStats = () =>
  html`
    <pokemon-stats
      .stats="${{
        hp: 35,
        attack: 55,
        defense: 40,
        'special-attack': 50,
        'special-defense': 50,
      }}"
    ></pokemon-stats>
  `;
