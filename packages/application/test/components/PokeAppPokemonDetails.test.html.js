import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';

import { PokeAppPokemonDetails } from '../../src/components/PokeAppPokemonDetails.js';
import { NavigateToPokemonSearchEvent } from '../../src/events/NavigateToPokemonSearchEvent.js';

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

    const $feat = $el.shadowRoot.querySelector('[data-testid="feature"]');

    expect($feat.getAttribute('name')).to.be.equal('pikachu');
  });

  it('should dispatch a navigationEvent clicking on search button', async () => {
    const stub = sandbox.stub();
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
    $el.addEventListener(NavigateToPokemonSearchEvent.eventName, event => stub(event));

    $el._handleGoToSearchClicked();

    expect(stub.calledOnce).to.be.true;
    expect(stub.firstCall.firstArg).to.be.instanceof(NavigateToPokemonSearchEvent);
  });
});
