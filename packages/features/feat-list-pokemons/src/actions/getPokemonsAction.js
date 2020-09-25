import { getPokemonProvider } from '../providers/PokemonProvider.js';

export const getPokemonsAction = async () => {
  const pokemonProvider = getPokemonProvider();
  const {
    data: { results },
  } = await pokemonProvider.getPokemons({
    params: {
      limit: 1500,
    },
  });

  return results;
};
