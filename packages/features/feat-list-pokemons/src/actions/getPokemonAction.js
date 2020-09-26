import { getPokemonProvider } from '../providers/PokemonProvider.js';

/**
 * Obtains a Pokemon details.
 *
 * @param {string} name
 * @return {Promise<Pokemon>}
 */
export const getPokemonAction = async name => {
  if (typeof name === 'undefined') {
    throw new Error(`Pokemon's name is required`);
  }

  return getPokemonProvider().getPokemon(name);
};
