import { expect, fixture, html } from '@open-wc/testing';
import { PokemonStats } from '../../src/components/pokemon-stats/PokemonStats.js';

/** @typedef {import('chi-wc/core').TemplateResult} TemplateResult */
/** @typedef {import('@pokeapp/common').PokemonStats } PokemonStats */

/**
 * Creates a scoped fixture.
 *
 * @param {TemplateResult} template
 * @return {Promise<PokemonStats>}
 */
const scopedFixture = async template => {
  const $el = /** @type {PokemonStats} */ await fixture(template, {
    scopedElements: { 'pokemon-stats': PokemonStats },
  });

  return $el;
};

/** @type {PokemonStats} */
const pokemonStats = {
  hp: 54,
  attack: 45,
  defense: 65,
  'special-attack': 78,
  'special-defense': 70,
  speed: 30,
};

describe('PokemonStats', () => {
  it('should be accessible', async () => {
    const $el = await scopedFixture(
      html` <pokemon-stats .stats="${pokemonStats}"></pokemon-stats> `,
    );

    await expect($el).to.be.accessible();
  });

  Object.entries(pokemonStats).forEach(([key, value]) => {
    it(`should adjust the ${key} progress bar to the value provided`, async () => {
      const $el = await scopedFixture(
        html` <pokemon-stats .stats="${pokemonStats}"></pokemon-stats> `,
      );

      const $progress = $el.shadowRoot.querySelector(`[data-stat="${key}"] > div`);

      expect($progress.getAttribute('style')).to.be.equal(`width: ${value}%`);
    });
  });
});
