import { css } from 'chi-wc/core';
import { rem } from 'chi-wc/style';
import { boxSizingStyle } from '@pokeapp/common';
import {
  tokenColorBackgroundBase,
  tokenColorBackgroundBaseDark,
  tokenColorBorderBase,
  tokenBorderRadiusBase,
} from 'chi-wc/foundations';

// language=CSS
export const pokemonCardStyle = [
  boxSizingStyle,
  css`
    .button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 180px;
      width: 140px;
      overflow: hidden;
      border: ${rem[1]} solid ${tokenColorBorderBase};
      border-radius: ${tokenBorderRadiusBase};
      padding: 0;
      background-color: ${tokenColorBackgroundBase};
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    }
    .button:hover {
      cursor: pointer;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
    }

    .image {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60%;
      max-height: 60%;
      padding: ${rem[8]};
    }
    .image > * {
      max-height: 100%;
      max-width: 100%;
    }
    .not-found {
      height: ${rem[32]};
      width: ${rem[32]};
    }

    .name {
      text-transform: uppercase;
      text-align: center;
      padding: ${rem[8]};
      height: 40%;
      min-height: 40%;
      width: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: ${rem[1]} solid ${tokenColorBorderBase};
      background-color: ${tokenColorBackgroundBaseDark};
    }
  `,
];
