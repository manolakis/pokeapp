import { css } from 'chi-wc/core';
import { desktopGenerator } from 'chi-wc/style';
import { tokenColorBackgroundBase, tokenColorBackgroundBaseDark } from 'chi-wc/foundations';
import { boxSizingStyle } from '@pokeapp/common';

// language=CSS
export const pokeAppStyle = [
  boxSizingStyle,
  css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .pokeapp__container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;
      background-color: ${tokenColorBackgroundBaseDark};
    }

    .pokeapp__header,
    .pokeapp__content {
      width: 100%;
    }

    .pokeapp__header {
      z-index: 1;
      --color-background-base: #ef5350;
    }

    .pokeapp__content {
      background-color: ${tokenColorBackgroundBase};
      flex: 1;
      padding: 0.5rem;
    }

    .logo {
      height: 2.5rem;
      width: 6rem;
      margin-top: 0.5rem;
    }

    ${desktopGenerator(css`
      .pokeapp__header,
      .pokeapp__content {
        width: 1200px;
        max-width: 100%;
      }
    `)}
  `,
];
