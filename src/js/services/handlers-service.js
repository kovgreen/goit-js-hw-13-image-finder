import api from './api-service.js';
import PNotify from 'pnotify/dist/es/PNotify';

export default {
  handlerSubmit(e) {
    e.preventDefault();

    this.input = e.currentTarget.elements.query;

    if (!this.input.value) {
      PNotify.error({
        text: 'Your request is empty. Please repeat your search!',
        ...this.pnotifySettings(),
        width: '260px',
        minHeight: '120px',
      });

      return;
    }

    this.clearImgListItems();
    api.resetPage();

    api.findQuery = this.input.value;

    this.getListCardImgs();

    this.input.value = '';
  },

  loadMoreBtnHadlerClick() {
    this.getListCardImgs();
  },
};
