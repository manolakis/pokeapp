import { expect } from '@open-wc/testing';
import { stub } from '@pokeapp/common';
import sinon from 'sinon';

import { getPokemonProvider } from '../../src/providers/PokemonProvider.js';
import pikachuData from './pikachu.js';

describe('PokemonProvider', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getPokemonNames', () => {
    it('should return a list of Pokemon names', async () => {
      const provider = getPokemonProvider();
      stub.callsFake(() => ({
        data: {
          results: [
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
            { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
            { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
            { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
          ],
        },
      }));

      const pokemonNames = await provider.getPokemonNames();

      expect(pokemonNames).to.be.eql(['bulbasaur', 'ivysaur', 'venusaur', 'charmander']);
    });
  });

  describe('getPokemon', () => {
    it('should return a Pokemon detail', async () => {
      const provider = getPokemonProvider();
      stub.callsFake(() => ({ data: pikachuData }));

      const pokemon = await provider.getPokemon('pikachu');

      expect(pokemon).to.be.eql({
        name: 'pikachu',
        sprite:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
      });
    });
  });
});
