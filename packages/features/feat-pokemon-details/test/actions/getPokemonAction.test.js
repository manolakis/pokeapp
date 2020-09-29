import { expect } from '@open-wc/testing';
import sinon from 'sinon';

import { getPokemonProvider } from '../../src/providers/PokemonProvider.js';
import { getPokemonAction } from '../../src/actions/getPokemonAction.js';

describe('getPokemonAction', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return the details of a Pokemon', async () => {
    const data = {};
    const pokemonProvider = getPokemonProvider();
    const stub = sandbox.stub(pokemonProvider, 'getPokemon').returns(data);

    const result = await getPokemonAction('Pikachu');

    expect(result).to.be.equal(data);
    expect(stub.calledOnce).to.be.true;
    expect(stub.firstCall.firstArg).to.be.equal('Pikachu');
  });

  it('should throw an Error if no name is provided', async () => {
    let error;

    try {
      await getPokemonAction();
    } catch (e) {
      error = e;
    }

    expect(error).to.not.be.undefined;
  });
});
