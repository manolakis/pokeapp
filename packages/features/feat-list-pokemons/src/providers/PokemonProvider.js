import { singletonManager } from 'singleton-manager';
import { DataProvider } from '@pokeapp/common';

/**
 * @typedef {import('@pokeapp/common').Pokemon} Pokemon
 * @typedef {import('@pokeapp/common/types/PokeAPI').NamedAPIResourceList} PokemonListAPI
 * @typedef {import('@pokeapp/common/types/PokeAPI').Pokemon} PokemonAPI
 * @typedef {import('../../types/PokemonProvider').PokemonProvider} PokemonProvider
 */

/**
 * @implements PokemonProvider
 */
class PokemonProviderImpl {
  constructor() {
    this.__provider = new DataProvider({
      baseURL: 'https://pokeapi.co/api/v2',
    });
  }

  async getPokemonNames() {
    const { /** @type {PokemonListAPI} */ data } = await this.__provider.request({
      method: 'get',
      url: '/pokemon',
      params: {
        limit: 1500,
      },
    });

    return data.results.map(({ name }) => name);
  }

  async getPokemon(name) {
    const { /** @type {PokemonAPI}  */ data } = await this.__provider.request({
      method: 'get',
      url: `/pokemon/${name}`,
    });

    return /** @type {Pokemon} */ {
      name: data.name,
      sprite: data.sprites.other?.dream_world?.front_default || data.sprites.front_default,
    };
  }
}

/** @type {PokemonProvider} */
let pokemonProvider =
  singletonManager.get('feat-list-pokemons::pokemonProvider::1.x') || new PokemonProviderImpl();

/**
 * Obtains the PokemonProvider.
 *
 * @return {PokemonProvider}
 */
export const getPokemonProvider = () => pokemonProvider;

/**
 * Set the PokemonProvider to use.
 *
 * @param {PokemonProvider} newPokemonProvider
 */
export const setPokemonProvider = newPokemonProvider => {
  pokemonProvider = newPokemonProvider;
};
