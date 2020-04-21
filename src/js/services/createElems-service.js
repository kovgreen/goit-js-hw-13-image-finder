export default {
  createEl(tagName, className) {
    const el = document.createElement(tagName);
    el.classList.add(...className);

    return el;
  },

  createDomEls() {
    const rootEl = this.createEl('div', ['root', 'js-root']);

    const form = this.createEl('form', ['find-form', 'js-find-form']);

    const inputMarkup = this.createEl('input', ['find-form__input']);

    inputMarkup.type = 'text';
    inputMarkup.name = 'query';
    inputMarkup.autocomplete = 'off';
    inputMarkup.placeholder = 'Find images...';

    form.append(inputMarkup);

    const list = this.createEl('ul', ['card-list', 'js-card-list']);

    const btn = this.createEl('button', ['btn', 'is-hidden']);
    btn.dataset.action = 'load-more';
    btn.textContent = 'load more';

    const spin = this.createSpinnerEl();

    rootEl.append(form, list, btn, spin);

    return rootEl;
  },

  createSpinnerEl() {
    const spinnerEl = this.createEl('div', [
      'spinner',
      'js-spinner',
      'is-hidden',
    ]);

    const firstSpinnerEl = this.createEl('div', ['loader', 'first']);
    const secondSpinnerEl = this.createEl('div', ['loader', 'second']);
    const thirdSpinnerEl = this.createEl('div', ['loader', 'third']);

    spinnerEl.append(firstSpinnerEl, secondSpinnerEl, thirdSpinnerEl);

    return spinnerEl;
  },
};
