import { Pokemon } from '@pokeapp/common';

export declare interface PokemonProvider {
  /** Returns a list of Pokemon names. */
  getPokemonNames(): Promise<Array<string>>;

  /** Returns the detail of a Pokemon */
  getPokemon(name: string): Promise<Pokemon>;
}
