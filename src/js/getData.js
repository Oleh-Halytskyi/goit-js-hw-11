export default async function getData(value, page) {
    const token = await fetch(`https://pixabay.com/api/?key=31292258-e6d16d3dcb403babd1a846395&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
    const response = await token.json()
    const dataResponse = await response
    
    return dataResponse
  }

