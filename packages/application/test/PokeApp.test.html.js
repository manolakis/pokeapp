import { html, expect, fixture } from '@open-wc/testing';
import sinon from 'sinon';

import { PokeApp } from '../src/PokeApp.js';
import { NavigateToPokemonDetailsEvent } from '../src/events/NavigateToPokemonDetailsEvent.js';

/**
 * Creates a scoped fixture.
 *
 * @param {TemplateResult} template
 * @return {Promise<PokeApp>}
 */
const scopedFixture = async template => {
  return fixture(template, {
    scopedElements: { 'pokemon-app': PokeApp },
  });
};

describe('PokeApp', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be accessible', async () => {
    const $el = await scopedFixture(html` <pokemon-app></pokemon-app> `);

    expect($el).to.be.accessible();
  });

  it('should setup the router on firstUpdated', async () => {
    const $el = await scopedFixture(html` <pokemon-app></pokemon-app> `);

    expect($el.router).to.not.be.undefined;
  });

  it('should handle the NavigateToPokemonDetailsEvent', async () => {
    const $el = await scopedFixture(html` <pokemon-app></pokemon-app> `);
    $el.__setRoute = sandbox.stub();

    $el.dispatchEvent(new NavigateToPokemonDetailsEvent('pikachu'));

    expect($el.__setRoute.calledOnce).to.be.true;
    expect($el.__setRoute.firstCall.firstArg).to.be.equal('/pikachu');
  });
});
