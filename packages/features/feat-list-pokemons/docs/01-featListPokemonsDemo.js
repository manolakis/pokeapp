import { css, html } from 'chi-wc';
import { FeatListPokemons } from '../src/FeatListPokemons.js';
import { addStylesToDocumentHeader } from '../../../helpers/addStylesToDocumentHeader.js';

customElements.define('feat-list-pokemons', FeatListPokemons);

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

export const renderFeatListPokemons = () => html` <feat-list-pokemons></feat-list-pokemons> `;
