import { PokemonDetails } from '@pokeapp/common';

export declare interface PokemonProvider {
  /** Returns the detail of a Pokemon */
  getPokemonDetails(name: string): Promise<PokemonDetails>;
}
