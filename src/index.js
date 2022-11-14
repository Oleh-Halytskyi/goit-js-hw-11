import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import {getData} from './js/getData'
let getEl = selector => document.querySelector(selector);

getEl('.search-form').addEventListener('submit', getImg);
getEl('.load-more').addEventListener('click', loadingNext);

const options = {
   searchValue: "",
   page: 1,
}



async  function getImg() {
   event.preventDefault()
   resetPage()
   options.searchValue = getEl('.form__input').value;
   const dataResponse = await getData(options.searchValue, options.page);
   const arr = dataResponse.hits
   options.page += 1;
   
   if (arr.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      getEl('.gallery').innerHTML = '';
   } else{
      Notiflix.Notify.success(`Hooray! We found ${dataResponse.totalHits} images.`);        
      markupFirstDownload(arr);
   }
   const lightbox = new SimpleLightbox('.gallery a', {});
}

async function loadingNext(searchValue, page) {
   const dataResponse = await getData(options.searchValue, options.page);
   const arr = dataResponse.hits
   if (arr.length === 0) {
      Notiflix.Notify.failure('We\'re sorry, but you\'ve reached the end of search results.');
      getEl('.load-more').classList.add("visually-hidden");
      return
   }
   options.page += 1;
   markupNextDownload(arr);
   const lightbox = new SimpleLightbox('.gallery a', {});
}

function markupFirstDownload(arr) {
   
   const render = arr.map(({webformatURL,largeImageURL, tags, likes, views, comments, downloads})=> {
      return`
      <div class="photo-card">
         <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
         </a>   
         <div class="info">
            <p class="info-item">
               <b>Likes</b>
               <span>${likes}</span>
            </p>
            <p class="info-item">
            <b>Views</b><span>${views}</span>
            </p>
            <p class="info-item">
            <b>Comments</b><span>${comments}</span>
            </p>
            <p class="info-item">
            <b>Downloads</b><span>>${downloads}</span>
            </p>
            </div>
      </div>`
   }).join('');
         
   getEl('.gallery').innerHTML = render;
   showButton();
   
   const { height: cardHeight } = document
   .querySelector(".gallery")
   .firstElementChild.getBoundingClientRect();

   window.scrollBy({
   top: cardHeight * 1,
   behavior: "smooth",
   });
   
}

function markupNextDownload(arr) {
   
   const render = arr.map(({webformatURL,largeImageURL, tags, likes, views, comments, downloads})=> {
      return`
      <div class="photo-card">
         <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
         </a>   
         <div class="info">
            <p class="info-item">
               <b>Likes</b>
               <span>${likes}</span>
            </p>
            <p class="info-item">
            <b>Views</b><span>${views}</span>
            </p>
            <p class="info-item">
            <b>Comments</b><span>${comments}</span>
            </p>
            <p class="info-item">
            <b>Downloads</b><span>>${downloads}</span>
            </p>
            </div>
      </div>`
   }).join('');
         
   getEl('.gallery').insertAdjacentHTML("beforeend", render);

   
}
      
function resetPage() {
   options.page = 1;
   getEl('.load-more').classList.add("visually-hidden");
}

function showButton() {
   getEl('.load-more').classList.remove("visually-hidden");
}

