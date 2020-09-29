import { css, rem } from 'chi-wc';
import { boxSizingStyle } from '@pokeapp/common';
import { tokenColorBackgroundBaseDark } from 'chi-wc/packages/foundations/tokens/color';

// language=CSS
export const pokemonStatsStyle = [
  boxSizingStyle,
  css`
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

    .stat {
      text-transform: capitalize;
    }

    .progress-bar {
      position: relative;
      width: 100%;
      height: ${rem[6]};
      background-color: ${tokenColorBackgroundBaseDark};
      overflow: hidden;
      margin-bottom: ${rem[8]};
    }
    .progression {
      background-color: #cc0000;
      height: 100%;
    }
  `,
];
