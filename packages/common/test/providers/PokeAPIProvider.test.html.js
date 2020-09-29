import { expect } from '@open-wc/testing';
import sinon from 'sinon';

import { stub } from './mocks/DataProvider.js';
import { PokeAPIProvider } from '../../src/providers/PokeAPIProvider.js';
import pikachuData from './pikachu.js';

describe('PokeAPIProvider', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getPokemonNames', () => {
    it('should return a list of Pokemon names', async () => {
      const provider = new PokeAPIProvider();
      stub.callsFake(() => ({
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
          { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
          { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
        ],
      }));

      const pokemonNames = await provider.getPokemonNames();

      expect(pokemonNames).to.be.eql(['bulbasaur', 'ivysaur', 'venusaur', 'charmander']);
    });
  });

  describe('getPokemon', () => {
    it('should return a Pokemon detail', async () => {
      const provider = new PokeAPIProvider();
      stub.callsFake(() => pikachuData);

      const pokemon = await provider.getPokemon('pikachu');

      expect(pokemon).to.be.eql({
        id: 25,
        name: 'pikachu',
        height: 4,
        weight: 60,
        sprite:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
        stats: {
          hp: 35,
          attack: 55,
          defense: 40,
          'special-attack': 50,
          'special-defense': 50,
          speed: 90,
        },
      });
    });
  });
});
