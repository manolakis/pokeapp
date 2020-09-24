import { singletonManager } from 'singleton-manager';
import { DataProvider } from '@pokeapp/common';

/**
 * @interface PokemonProvider
 */

/**
 * Gets the pokemon list.
 *
 * @function
 * @name PokemonProvider#getPokemons
 * @returns {Promise<any>} An array with a pokemon descriptor
 */

/**
 * @implements PokemonProvider
 */
class PokemonProviderImpl extends DataProvider {
  constructor() {
    super({
      baseURL: 'https://pokeapi.co/api/v2',
    });
  }

  async getPokemons(options) {
    return this.request({
      method: 'get',
      url: '/pokemon',
      ...options,
    });
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
