import { css, rem, tabletPortraitGenerator } from 'chi-wc';
import { boxSizingStyle } from '@pokeapp/common';
import { tokenColorBackgroundBaseDark } from 'chi-wc/packages/foundations/tokens/color';
import { tokenBorderRadiusBase } from 'chi-wc/packages/foundations/tokens/border-radius';

// language=CSS
export const featPokemonDetailsStyle = [
  boxSizingStyle,
  css`
    :host {
      display: grid;
    }
    .title {
      font-family: 'Pokemon';
      text-transform: capitalize;
    }
    .container {
      display: grid;
      grid-column-gap: ${rem[8]};
      grid-template-rows: auto 1fr;
    }
    .image {
      position: relative;
      width: 100%;
      padding: ${rem[8]};
      border-radius: ${tokenBorderRadiusBase};
      background-color: ${tokenColorBackgroundBaseDark};
    }
    .image img {
      max-width: 100%;
    }

    ${tabletPortraitGenerator(css`
      .container {
        display: grid;
        grid-template-columns: 300px auto;
      }
    `)}
  `,
];
