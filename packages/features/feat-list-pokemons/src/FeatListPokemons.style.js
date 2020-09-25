import { css, boxSizingGenerator, rem } from 'chi-wc';

// language=CSS
export const featListPokemonStyle = css`
  ${boxSizingGenerator(':host', '*')}

  .pokemon-list {
    list-style: none;
    margin: ${rem[16]} 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, 150px);
    justify-content: space-between;
  }

  .pokemon-list > * {
    width: 150px;
  }
`;
