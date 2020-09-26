import { expect, fixture, html, elementUpdated } from '@open-wc/testing';
import sinon from 'sinon';

import { getPokemonProvider } from '../src/providers/PokemonProvider.js';
import { FeatListPokemons } from '../src/FeatListPokemons.js';

/** @typedef {import('chi-wc').TemplateResult} TemplateResult */
/** @typedef {import('@pokeapp/common').Pokemon } Pokemon */

/**
 * Creates a scoped fixture.
 *
 * @param {TemplateResult} template
 * @return {Promise<FeatListPokemons>}
 */
const scopedFixture = async template => {
  const $el = /** @type {FeatListPokemons} */ await fixture(template, {
    scopedElements: { 'feat-list-pokemons': FeatListPokemons },
  });

  await $el.pokemonNamesLoading;
  await elementUpdated($el);

  return $el;
};

/** @type {Pokemon} */
const pikachuData = {
  name: 'pikachu',
  sprite:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
};

describe('FeatListPokemons', () => {
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
    sandbox.stub(pokemonProvider, 'getPokemonNames').returns(['pikachu']);

    const $el = await scopedFixture(html` <feat-list-pokemons></feat-list-pokemons> `);

    await expect($el).to.be.accessible();
  });

  it('should load the pokemon names on start up', async () => {
    const pokemonProvider = getPokemonProvider();
    sandbox.stub(pokemonProvider, 'getPokemon').returns(pikachuData);
    sandbox.stub(pokemonProvider, 'getPokemonNames').returns(['pikachu']);

    const $el = await scopedFixture(html` <feat-list-pokemons></feat-list-pokemons> `);

    expect($el.pokemonNames).to.be.eql(['pikachu']);
  });

  it('should not show any pokemon card by default', async () => {
    const pokemonProvider = getPokemonProvider();
    sandbox.stub(pokemonProvider, 'getPokemon').returns(pikachuData);
    sandbox.stub(pokemonProvider, 'getPokemonNames').returns(['pikachu']);

    const $el = await scopedFixture(html` <feat-list-pokemons></feat-list-pokemons> `);
    const $list = $el.shadowRoot.querySelector('.pokemon-list');

    expect($list.children.length).to.be.equal(0);
  });

  it('should show the list of pokemons filtering by the search input', async () => {
    const pokemonProvider = getPokemonProvider();
    sandbox.stub(pokemonProvider, 'getPokemon').returns(pikachuData);
    sandbox.stub(pokemonProvider, 'getPokemonNames').returns(['pikachu']);

    const $el = await scopedFixture(html` <feat-list-pokemons></feat-list-pokemons> `);
    const $searchInput = $el.shadowRoot.querySelector('[data-id="search"]');
    const $list = $el.shadowRoot.querySelector('.pokemon-list');

    $searchInput.modelValue = 'pikachu';
    await elementUpdated($el);

    expect($list.children.length).to.be.equal(1);
  });
});
