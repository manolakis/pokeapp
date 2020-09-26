import { expect } from '@open-wc/testing';
import sinon from 'sinon';

import { getPokemonProvider } from '../../src/providers/PokemonProvider.js';
import { getPokemonNamesAction } from '../../src/actions/getPokemonNamesAction.js';

describe('getPokemonNamesAction', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return a list of Pokemon names', async () => {
    const results = [];
    const pokemonProvider = getPokemonProvider();
    const stub = sandbox.stub(pokemonProvider, 'getPokemonNames').returns(results);

    const result = await getPokemonNamesAction();

    expect(result).to.be.equal(results);
    expect(stub.calledOnce).to.be.true;
  });
});
