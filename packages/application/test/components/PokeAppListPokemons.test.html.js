import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';

import { PokeAppListPokemons } from '../../src/components/PokeAppListPokemons.js';
import { NavigateToPokemonDetailsEvent } from '../../src/events/NavigateToPokemonDetailsEvent.js';

/**
 * Creates a scoped fixture.
 *
 * @param {TemplateResult} template
 * @return {Promise<PokeAppListPokemons>}
 */
const scopedFixture = async template => {
  return fixture(template, {
    scopedElements: { 'pokeapp-list-pokemons': PokeAppListPokemons },
  });
};

describe('PokeAppListPokemons', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should throw a NavigateToPokemonDetailsEvent when a Pokemon is selected', async () => {
    const stub = sandbox.stub();
    const $el = await scopedFixture(html` <pokeapp-list-pokemons></pokeapp-list-pokemons> `);
    $el.addEventListener(NavigateToPokemonDetailsEvent.eventName, event => stub(event));

    $el._handlePokemonSelected({ name: 'pikachu' });

    expect(stub.calledOnce).to.be.true;
    expect(stub.firstCall.firstArg).to.be.instanceof(NavigateToPokemonDetailsEvent);
  });
});
