// ===============================================================\\
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const select = document.querySelector('.breed-select');
export const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

showLoader();
hideError();

new SlimSelect({
  select: '#selectElement',
});

// ===============================================================\\
select.addEventListener('change', event => {
  if (event.target.value) {
    catInfo.innerHTML = '';
    showLoader();
    fetchCatByBreed(event.target.value)
      .then(response => {
        if (response.data.length === 0) {
          throw new Error();
        }
        Notiflix.Notify.success(`✅ Your cat is found`);
        setCatInfo(response.data[0]);
      })
      .catch(error => {
        Notiflix.Notify.failure(`❌ Not found`);
        console.log(error);
        showError();
      })
      .finally(() => {
        hideLoader();
      });
  }
});

// ===============================================================\\
// Create list in select \\

function setOptions(breeds) {
  const newBreeds = [{ id: '', name: '' }, ...breeds];
  const allCats = newBreeds
    .map(item => `<option value="${item.id}">${item.name}</option>`)
    .join();
  select.innerHTML = allCats;
  hideLoader();
  // let options = ['<option value=""></option>'];
  // let markup = '';
  // breeds.forEach(item => {
  //   options.push(`<option value="${item.id}">${item.name}</option>`);
  // });
  // markup = options.join('');
}

// ===============================================================\\
// Import function\\
fetchBreeds()
  .then(response => {
    setOptions(response);
  })
  .catch(error => {
    Notiflix.Notify.failure(`❌ Not found`);
    console.log(error);
    showError();
  })
  .finally(() => {
    hideLoader();
  });

// ===============================================================\\
// Create information about cats on page \\
function setCatInfo(response) {
  const catImgAndText = `<img src="${response.url}" width = "600px" alt = "Cat image">
  <p id="breed-name">${response.breeds[0].name}</p>
  <p id="breed-name">${response.breeds[0].description}</p>
  <p id="breed-name">${response.breeds[0].temperament}</p>`;
  catInfo.innerHTML = catImgAndText;
  hideLoader();
}

// ===============================================================\\
// function for style page whe we have loader or error
function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showError() {
  error.style.display = 'block';
}

function hideError() {
  error.style.display = 'none';
}
