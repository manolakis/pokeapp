import { NavigationEvent } from './NavigationEvent.js';

export class NavigateToPokemonDetailsEvent extends NavigationEvent {
  /**
   * Creates a NavigateToPokemonDetailsEvent instance.
   * @param {string} pokemonName
   */
  constructor(pokemonName) {
    super('pokeapp-pokemon-details', {
      name: pokemonName,
    });
  }
}
