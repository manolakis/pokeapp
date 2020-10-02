import { NavigationEvent } from './NavigationEvent.js';

export class NavigateToPokemonSearchEvent extends NavigationEvent {
  /**
   * Creates a NavigateToPokemonSearchEvent instance.
   */
  constructor() {
    super('pokeapp-list-pokemons');
  }
}
