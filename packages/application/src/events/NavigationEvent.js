/** NavigationEvent */
export class NavigationEvent extends CustomEvent {
  /**
   * Name of the event.
   *
   * @return {string}
   */
  static get eventName() {
    return 'pokemon-app::navigation';
  }

  /** Creates an event instance. */
  constructor() {
    super(NavigationEvent.eventName, {
      bubbles: true,
      composed: true,
    });
  }
}
