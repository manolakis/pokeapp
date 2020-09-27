import { singletonManager } from 'singleton-manager';
import { PokeAPIProvider } from '@pokeapp/common';

/** @typedef {import('../../types/PokemonProvider').PokemonProvider} PokemonProvider */

/** @type {PokemonProvider} */
let pokemonProvider =
  singletonManager.get('feat-list-pokemons::pokemonProvider::1.x') || new PokeAPIProvider();

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
