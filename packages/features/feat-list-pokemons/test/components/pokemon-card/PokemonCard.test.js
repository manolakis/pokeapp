import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';

import { getPokemonProvider } from '../../../src/providers/PokemonProvider.js';
import { PokemonCard } from '../../../src/components/pokemon-card/PokemonCard.js';

/** @typedef {import('chi-wc/core').TemplateResult} TemplateResult */
/** @typedef {import('@pokeapp/common').Pokemon } Pokemon */

/**
 * Creates a scoped fixture.
 *
 * @param {TemplateResult} template
 * @return {Promise<PokemonCard>}
 */
const scopedFixture = async template => {
  const $el = /** @type {PokemonCard} */ await fixture(template, {
    scopedElements: { 'pokemon-card': PokemonCard },
  });

  await $el.pokemonLoading;

  return $el;
};

/** @type {Pokemon} */
const pikachuData = {
  name: 'pikachu',
  sprite:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
};

describe('PokemonCard', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be accessible', async () => {
    const pokemonProvider = getPokemonProvider();
    sandbox.stub(pokemonProvider, 'getPokemon').returns(pikachuData);

    const $el = await scopedFixture(html` <pokemon-card name="pikachu"></pokemon-card> `);

    await expect($el).to.be.accessible();
  });

  it('should show the Pokemon sprite if exists', async () => {
    const pokemonProvider = getPokemonProvider();
    sandbox.stub(pokemonProvider, 'getPokemon').returns(pikachuData);

    const $el = await scopedFixture(html` <pokemon-card name="pikachu"></pokemon-card> `);
    const image = $el.shadowRoot.querySelector('.image img');

    expect(image.src).to.be.equal(pikachuData.sprite);
  });

  it('should show a default sprite if the Pokemon sprite is null', async () => {
    const pokemonProvider = getPokemonProvider();
    sandbox.stub(pokemonProvider, 'getPokemon').returns({ ...pikachuData, sprite: null });

    const $el = await scopedFixture(html` <pokemon-card name="pikachu"></pokemon-card> `);
    const notFoundIcon = $el.shadowRoot.querySelector('.image .not-found');

    expect(notFoundIcon).to.not.be.null;
  });
});
