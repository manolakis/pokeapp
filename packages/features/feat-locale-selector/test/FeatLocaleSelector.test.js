import { expect, fixture, html } from '@open-wc/testing';
import { localize } from 'chi-wc';
import sinon from 'sinon';

import { FeatLocaleSelector } from '../src/FeatLocaleSelector.js';
import flags from '../assets/translations/flags.js';

/** @typedef {import('chi-wc').TemplateResult} TemplateResult */

/**
 * Creates a scoped fixture.
 *
 * @param {TemplateResult} template
 * @return {Promise<FeatLocaleSelector>}
 */
const scopedFixture = async template => {
  return fixture(template, {
    scopedElements: { 'feat-locale-selector': FeatLocaleSelector },
  });
};

const [defaultLang] = Object.keys(flags);

describe('FeatLocaleSelector', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    document.documentElement.lang = defaultLang;
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be accessible', async () => {
    const $el = await scopedFixture(html` <feat-locale-selector></feat-locale-selector> `);

    await expect($el).to.be.accessible();
  });

  it('should render lang emoji flag to change lang', async () => {
    const $el = await scopedFixture(html` <feat-locale-selector></feat-locale-selector> `);

    const $btn = $el.shadowRoot.querySelector('.flag');

    expect($btn.textContent).to.equal(flags[$btn.getAttribute('data-lang')]);
  });

  describe('_handleClickOnFlag()', () => {
    it('should update localize.locale', async () => {
      const $el = await scopedFixture(html` <feat-locale-selector></feat-locale-selector> `);

      $el._handleClickOnFlag('es-ES');

      expect(localize.locale).to.equal('es-ES');
    });
  });
});
