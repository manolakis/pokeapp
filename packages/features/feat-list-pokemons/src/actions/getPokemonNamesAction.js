import { getPokemonProvider } from '../providers/PokemonProvider.js';

/**
 * Obtains the list of Pokemon names.
 *
 * @return {Promise<Array<string>>}
 */
export const getPokemonNamesAction = async () => getPokemonProvider().getPokemonNames();
