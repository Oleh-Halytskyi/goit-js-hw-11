const axios = require('axios').default;
import Notiflix from 'notiflix';
export async function getData(value, page) {
    try {
      const token = await axios.get(`https://pixabay.com/api/?key=31292258-e6d16d3dcb403babd1a846395&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
      const dataResponse = await token.data
      
      return dataResponse
  } catch (error) {
      Notiflix.Notify.failure(`${error.message}`)
    }

  }

