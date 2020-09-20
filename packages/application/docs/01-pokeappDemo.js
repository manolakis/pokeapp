import { html, css } from 'chi-wc';
import { PokeApp } from '../src/PokeApp.js';

customElements.define('pokemon-app', PokeApp);

const addGlobalStyles = styles => {
  const styleTag = document.createElement('style');

  styleTag.textContent = styles.cssText;

  document.head.appendChild(styleTag);
};

addGlobalStyles(css`
  html,
  body {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
  }
  .app {
    position: absolute;
    top: 0;
    left: 0;
  }
`);

export const renderPokeApp = () => html`<pokemon-app class="app"></pokemon-app>`;
