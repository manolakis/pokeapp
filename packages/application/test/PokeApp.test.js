import { html, expect, fixture as _fixture } from '@open-wc/testing';
import sinon from 'sinon';

import { PokeApp } from '../src/PokeApp.js';

describe('PokeApp', () => {
  const sandbox = sinon.createSandbox();
  const fixture = template =>
    _fixture(template, {
      scopedElements: {
        'pokemon-app': PokeApp,
      },
    });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be accessible', async () => {
    const $el = await fixture(html` <pokemon-app></pokemon-app> `);

    expect($el).to.be.accessible();
  });
});
