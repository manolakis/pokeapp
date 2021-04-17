import { css, html } from 'chi-wc/core';
import { PokemonCard } from '../src/components/pokemon-card/PokemonCard.js';
import { addStylesToDocumentHeader } from '../../../helpers/addStylesToDocumentHeader.js';

if (!customElements.get('pokemon-card')) {
  customElements.define('pokemon-card', PokemonCard);
}

// language=CSS
addStylesToDocumentHeader(css`
  @font-face {
    font-family: 'Pokemon';
    src: url('//db.onlinewebfonts.com/t/f4d1593471d222ddebd973210265762a.eot');
    src: url('//db.onlinewebfonts.com/t/f4d1593471d222ddebd973210265762a.eot?#iefix')
        format('embedded-opentype'),
      url('//db.onlinewebfonts.com/t/f4d1593471d222ddebd973210265762a.woff2') format('woff2'),
      url('//db.onlinewebfonts.com/t/f4d1593471d222ddebd973210265762a.woff') format('woff'),
      url('//db.onlinewebfonts.com/t/f4d1593471d222ddebd973210265762a.ttf') format('truetype'),
      url('//db.onlinewebfonts.com/t/f4d1593471d222ddebd973210265762a.svg#Pokemon') format('svg');
  }
`);

const pokemonName = 'bulbasaur';

export const renderPokemonCard = () => html`
  <pokemon-card
    name="${pokemonName}"
    @click="${() => this._handlePokemonSelected(pokemonName)}"
  ></pokemon-card>
`;
