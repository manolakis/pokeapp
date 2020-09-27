import { css, rem, tabletPortraitGenerator } from 'chi-wc';
import { boxSizingStyle } from '@pokeapp/common';

// language=CSS
export const featListPokemonStyle = [
  boxSizingStyle,
  css`
    .pokemon-list {
      list-style: none;
      margin: ${rem[16]} -0.5rem;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, 156px);
      justify-content: space-around;
    }

    .pokemon-list > li {
      padding: ${rem[8]};
    }

    ${tabletPortraitGenerator(css`
      .pokemon-list {
        grid-template-columns: repeat(auto-fill, minmax(156px, 1fr));
      }
    `)}
  `,
];
