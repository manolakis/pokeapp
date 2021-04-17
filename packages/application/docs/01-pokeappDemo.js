import { html, css } from 'chi-wc/core';
import { PokeApp } from '../src/PokeApp.js';
import { addStylesToDocumentHeader } from '../../helpers/addStylesToDocumentHeader.js';

customElements.define('pokemon-app', PokeApp);

addStylesToDocumentHeader(css`
  #story--pokeapp-details--pokeapp {
    position: relative;
    height: 800px;
  }
`);

export const renderPokeApp = () => html` <pokemon-app class="app"></pokemon-app> `;
