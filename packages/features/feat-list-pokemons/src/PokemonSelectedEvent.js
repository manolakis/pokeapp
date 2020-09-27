/** Event with the name of the selected Pokemon. */
export class PokemonSelectedEvent extends CustomEvent {
  /**
   * Name of the event.
   *
   * @return {string}
   */
  static get eventName() {
    return 'pokemon-selected';
  }

  /**
   * Creates an event instance.
   *
   * @param {string} pokemonName
   */
  constructor(pokemonName) {
    super(PokemonSelectedEvent.eventName, {
      bubbles: false,
      composed: false,
    });

    this.pokemonName = pokemonName;
  }
}
