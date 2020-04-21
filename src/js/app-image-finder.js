import api from './services/api-service.js';
import imgCardTemplate from '../templates/img-card-template.hbs';
import handlers from './services/handlers-service.js';
import createEl from './services/createElems-service.js';
import spinner from './services/spinner.js';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial';

class imgFinderApp {
  constructor() {
    this.body = document.querySelector('body');
    this.divEl = document.createElement('div');
    this.findForm = null;
    this.imgList = null;
    this.loadMoreBtn = null;
    this.inputValue = null;
    this.spinner = null;
    this.items = null;

    this.init();
  }

  init() {
    this.body.prepend(createEl.createDomEls());

    this.setDomEls();

    this.findForm.addEventListener('submit', handlers.handlerSubmit.bind(this));
    this.loadMoreBtn.addEventListener(
      'click',
      handlers.loadMoreBtnHadlerClick.bind(this),
    );
  }

  setDomEls() {
    this.findForm = document.querySelector('.js-find-form');
    this.imgList = document.querySelector('.js-card-list');
    this.loadMoreBtn = document.querySelector(
      'button[data-action="load-more"]',
    );
    this.spinner = document.querySelector('.spinner');
  }

  pnotifySettings() {
    return {
      styling: 'material',
      icons: 'material',
      icon: true,
      width: '155px',
      addClass: 'pad-top',
      delay: 2000,
    };
  }

  getListCardImgs() {
    spinner.show(this.spinner);

    api
      .axiosImgs()
      .then(data => {
        if (data.hits.length) {
          spinner.hide(this.spinner);

          this.addedListItems(data.hits);

          PNotify.success({
            text: 'Successful request!',
            ...this.pnotifySettings(),
          });

          window.scrollTo({
            top: this.loadMoreBtn.offsetTop,
            behavior: 'smooth',
          });
        } else {
          spinner.hide(this.spinner);

          PNotify.error({
            text: 'Unsuccessful request. Please repeat your search!',
            ...this.pnotifySettings(),
            width: '260px',
            minHeight: '120px',
          });
        }
      })
      .catch(console.error);
  }

  createImgCardItems(items) {
    return items.map(item => imgCardTemplate(item));
  }

  addedListItems(item) {
    if (
      !this.imgList.children.length &&
      this.loadMoreBtn.classList.contains('is-hidden')
    ) {
      this.loadMoreBtn.classList.remove('is-hidden');
    }

    this.divEl.innerHTML = this.createImgCardItems(item);

    this.items = this.divEl.querySelectorAll('.card-list__item');

    this.imgList.append(...this.items);
  }

  clearImgListItems() {
    this.imgList.innerHTML = '';
  }
}

new imgFinderApp();
