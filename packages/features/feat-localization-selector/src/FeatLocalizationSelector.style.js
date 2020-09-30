import { css } from 'chi-wc';
import { boxSizingStyle } from '@pokeapp/common';

// language=CSS
export const featLocalizationSelectorStyle = [
  boxSizingStyle,
  css`
    :host {
      display: block;
    }

    .flag {
      --color-background-base: #fff;
      --font-size-base: 1rem;
    }
  `,
];
