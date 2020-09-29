import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';

import { PokeAppPokemonDetails } from '../../src/components/PokeAppPokemonsDetails.js';

/**
 * Creates a scoped fixture.
 *
 * @param {TemplateResult} template
 * @return {Promise<PokeAppPokemonDetails>}
 */
const scopedFixture = async template => {
  return fixture(template, {
    scopedElements: { 'pokeapp-pokemon-details': PokeAppPokemonDetails },
  });
};

describe('PokeAppPokemonDetails', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should retrieve the name from the location and pass it to the feature', async () => {
    const $el = await scopedFixture(
      html`
        <pokeapp-pokemon-details
          .location="${{
            params: {
              name: 'pikachu',
            },
          }}"
        ></pokeapp-pokemon-details>
      `,
    );

    const $feat = $el.shadowRoot.firstElementChild;

    expect($feat.getAttribute('name')).to.be.equal('pikachu');
  });
});
