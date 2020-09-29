import { LitElement, ScopedElementsMixin, html } from 'chi-wc';
import { FeatPokemonDetails } from '@pokeapp/feat-pokemon-details';

export class PokeAppPokemonDetails extends ScopedElementsMixin(LitElement) {
  /** @override */
  static get scopedElements() {
    return {
      'feat-pokemon-details': FeatPokemonDetails,
    };
  }

  /** @override */
  static get properties() {
    return {
      location: { type: Object },
    };
  }

  /** @override */
  render() {
    const {
      params: { name },
    } = this.location;

    return html`<feat-pokemon-details name="${name}"></feat-pokemon-details>`;
  }
}
