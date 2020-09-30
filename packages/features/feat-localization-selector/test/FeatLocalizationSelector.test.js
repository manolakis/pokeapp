import { expect, fixture, html } from '@open-wc/testing';
import { localize } from 'chi-wc';
import sinon from 'sinon';

import {
  FeatLocalizationSelector,
  emojiFlags,
  defaultLangs,
} from '../src/FeatLocalizationSelector.js';

/** @typedef {import('chi-wc').TemplateResult} TemplateResult */
/** @typedef {import('@pokeapp/common').Pokemon } Pokemon */

/**
 * Creates a scoped fixture.
 *
 * @param {TemplateResult} template
 * @return {Promise<FeatLocalizationSelector>}
 */
const scopedFixture = async template => {
  const $el = await fixture(template, {
    scopedElements: { 'feat-localization-selector': FeatLocalizationSelector },
  });

  return $el;
};

const defaultLang = defaultLangs[0];

describe('FeatLocalizationSelector', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    document.documentElement.lang = defaultLang;
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be accessible', async () => {
    const $el = await scopedFixture(
      html` <feat-localization-selector></feat-localization-selector> `,
    );

    await expect($el).to.be.accessible();
  });

  it('should render lang emoji flag to change lang', async () => {
    const $el = await scopedFixture(
      html` <feat-localization-selector></feat-localization-selector> `,
    );

    expect($el.shadowRoot.querySelector('.flag').textContent).to.equal(emojiFlags[defaultLangs[1]]);
  });

  describe('clickHandler()', () => {
    let $el;

    beforeEach(async () => {
      $el = await scopedFixture(html` <feat-localization-selector></feat-localization-selector> `);
      $el.clickHandler();
    });

    it('should update currentLang', async () => {
      expect($el.currentLang).to.equal(defaultLangs[1]);
    });

    it('should update localize.locale', async () => {
      expect(localize.locale).to.equal(defaultLangs[1]);
    });
  });
});
