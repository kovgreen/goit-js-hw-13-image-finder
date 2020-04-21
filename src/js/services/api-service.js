import 'regenerator-runtime';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const key = '16070061-e558bf4629394a30a7b45ae97';

export default {
  page: 1,
  perPage: 12,
  query: '',

  async axiosImgs() {
    try {
      const params = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=${this.perPage}`;
      const response = await axios.get(`?key=${key}&${params}`);
      this.incrementPages();
      const data = response.data;

      return data;
    } catch (error) {
      console.error(error);
    }
  },
  incrementPages() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
  get findQuery() {
    return this.query;
  },
  set findQuery(query) {
    this.query = query;
  },
};
