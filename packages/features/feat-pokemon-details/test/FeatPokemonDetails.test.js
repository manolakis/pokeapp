import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';

import { getPokemonProvider } from '../src/providers/PokemonProvider.js';
import { FeatPokemonDetails } from '../src/FeatPokemonDetails.js';

/** @typedef {import('chi-wc/core').TemplateResult} TemplateResult */
/** @typedef {import('@pokeapp/common').Pokemon } Pokemon */

/**
 * Creates a scoped fixture.
 *
 * @param {TemplateResult} template
 * @return {Promise<FeatPokemonDetails>}
 */
const scopedFixture = async template => {
  const $el = /** @type {FeatPokemon} */ await fixture(template, {
    scopedElements: { 'feat-pokemon-details': FeatPokemonDetails },
  });

  await $el.pokemonLoading;

  return $el;
};

/** @type {Pokemon} */
const pikachuDetails = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  sprite: null,
  stats: {
    hp: 35,
    attack: 55,
    defense: 40,
    'special-attack': 50,
    'special-defense': 50,
    speed: 90,
  },
};

describe('FeatPokemonDetails', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be accessible', async () => {
    const pokemonProvider = getPokemonProvider();
    sandbox.stub(pokemonProvider, 'getPokemonDetails').returns(pikachuDetails);

    const $el = await scopedFixture(
      html` <feat-pokemon-details name="pikachu"></feat-pokemon-details> `,
    );

    await expect($el).to.be.accessible();
  });
});
