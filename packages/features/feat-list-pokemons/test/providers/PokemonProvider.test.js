import { expect } from '@open-wc/testing';
import sinon from 'sinon';

import { getPokemonProvider } from '../../src/providers/PokemonProvider.js';

describe('PokemonProvider', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getPokemons', () => {
    it('should be a get method', async () => {
      const provider = getPokemonProvider();
      const stub = sandbox.stub(provider.constructor.prototype, 'request').callsFake(() => ({}));

      await provider.getPokemons();

      expect(stub.calledOnce).to.be.true;
      expect(stub.firstCall.firstArg).to.be.eql({
        method: 'get',
        url: '/pokemon',
      });
    });
  });
});
