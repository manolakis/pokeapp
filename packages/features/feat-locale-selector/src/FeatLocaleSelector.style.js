import { css, rem } from 'chi-wc';
import { boxSizingStyle } from '@pokeapp/common';

// language=CSS
export const featLocaleSelectorStyle = [
  boxSizingStyle,
  css`
    :host {
      display: block;
    }

    .flag {
      --color-background-base: #fff;
      --font-size-base: ${rem[22]};
    }
  `,
];
