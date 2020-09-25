/**
 * Add styles to the document header.
 *
 * @param {CSSRule} styles
 */
export const addStylesToDocumentHeader = styles => {
  const styleTag = document.createElement('style');

  styleTag.textContent = styles.cssText;

  document.head.appendChild(styleTag);
};
