import { DataProvider } from './DataProvider.js';

/**
 * @typedef {import('../../types/DataModel').Pokemon} Pokemon
 * @typedef {import('../../types/PokeAPI').NamedAPIResourceList} PokemonListAPI
 * @typedef {import('../../types/PokeAPI').Pokemon} PokemonAPI
 */

/**
 * Provides access to
 */
export class PokeAPIProvider {
  constructor() {
    this.__provider = new DataProvider({
      baseURL: 'https://pokeapi.co/api/v2',
    });
  }

  /**
   * Returns a list with the Pokemon names
   * @return {Promise<string[]>}
   */
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

  /**
   * Returns a Pokemon details
   * @param {string} name
   * @return {Promise<{name: string, sprite: string}>}
   */
  async getPokemon(name) {
    const { /** @type {PokemonAPI}  */ data } = await this.__provider.request({
      method: 'get',
      url: `/pokemon/${name}`,
    });

    return {
      name: data.name,
      sprite: data.sprites.other?.dream_world?.front_default || data.sprites.front_default,
    };
  }
}
