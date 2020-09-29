import { html, LitElement, LocalizeMixin } from 'chi-wc';

import { namespace } from '../../namespace.js';
import { pokemonStatsStyle } from './PokemonStats.style.js';

export class PokemonStats extends LocalizeMixin(LitElement) {
  /** @override */
  static get styles() {
    return [super.style || [], pokemonStatsStyle];
  }

  /** @override */
  static get properties() {
    return {
      stats: { type: Object },
    };
  }

  /** @override */
  static get localizeNamespaces() {
    return [
      ...super.localizeNamespaces,
      {
        [namespace]: locale => {
          switch (locale) {
            case 'es-ES':
              return import(`../../../assets/translations/es-ES.js`);
            default:
              return import(`../../../assets/translations/en-GB.js`);
          }
        },
      },
    ];
  }

  /**
   * Write the progress bar for the stat.
   *
   * @param {string} key
   * @param {number} value
   */
  renderStat(key, value) {
    return html`
      <span class="stat" aria-hidden="true"
        >${this.msgLit(`${namespace}:pokemonStats.${key}`)}</span
      >
      <div
        class="progress-bar"
        data-stat="${key}"
        aria-label="${this.msgLit(`${namespace}:pokemonStats.progress`, {
          key,
          value,
        })}"
      >
        <div class="progression" style="width: ${value}%"></div>
      </div>
    `;
  }

  /** @override */
  render() {
    return html`
      <h2>${this.msgLit(`${namespace}:pokemonStats.title`)}</h2>
      ${Object.entries(this.stats).map(([key, value]) => this.renderStat(key, value))}
    `;
  }
}
