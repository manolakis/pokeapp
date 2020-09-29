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
    /** @type {PokemonListAPI} */
    const data = await this.__provider.request({
      method: 'get',
      url: '/pokemon',
      params: {
        limit: 1500,
      },
    });

    return data.results.map(({ name }) => name);
  }

  /**
   * Obtains the Pokemon details.
   *
   * @param {string} name
   * @return {Promise<{
   *   id: number,
   *   name: string,
   *   height: number,
   *   weight: number,
   *   sprite: string,
   *   stats: {
   *     hp: number,
   *     attack: number,
   *     defense: number,
   *     'special-attack': number,
   *     'special-defense': number,
   *     speed: number,
   *   }
   * }>}
   */
  async getPokemon(name) {
    /** @type {PokemonAPI}  */
    const { id, height, weight, stats, sprites } = await this.__provider.request({
      method: 'get',
      url: `/pokemon/${name}`,
    });

    return {
      id,
      name,
      height,
      weight,
      sprite: sprites.other?.dream_world?.front_default || sprites.front_default,
      stats: stats.reduce((acc, { base_stat: value, stat: { name: key } }) => {
        acc[key] = value;

        return acc;
      }, {}),
    };
  }

  /**
   * Obtains the Pokemon details.
   *
   * @param name
   * @return {Promise<{
   *   name: string,
   *   weight: number,
   *   id: number,
   *   height: number,
   * }>}
   */
  async getPokemonDetails(name) {
    /** @type {PokemonAPI}  */
    const { id, height, weight, stats } = await this._getPokemon(name);

    return {
      id,
      name,
      height,
      weight,
      stats: stats.reduce((acc, { base_stat: value, stat: { name: key } }) => {
        acc[key] = value;

        return acc;
      }, {}),
    };
  }
}
