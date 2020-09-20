import { boxSizingGenerator, css, desktopGenerator } from 'chi-wc';
import {
  tokenColorBackgroundBase,
  tokenColorBackgroundBaseDark,
} from 'chi-wc/packages/foundations/tokens/color';

// language=CSS
export const pokeAppStyle = css`
  ${boxSizingGenerator(':host', '*')}

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
    height: 100%;
    background-color: ${tokenColorBackgroundBaseDark};
  }
  .pokeapp__header,
  .pokeapp__content {
    width: 100%;
  }

  .pokeapp__header {
    z-index: 1;
  }

  .pokeapp__content {
    background-color: ${tokenColorBackgroundBase};
    flex: 1;
  }

  .pokeball {
    height: 3rem;
    width: 3rem;
  }

  ${desktopGenerator(css`
    .pokeapp__header,
    .pokeapp__content {
      width: 1200px;
    }
  `)}
`;
