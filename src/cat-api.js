import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_iK7ZkhUK16xSRzFPTH24R5qHQMz4onNJ6fDu2OfuSCGZOdFW7nALORYxr24GVAe7';

export function fetchCatByBreed(breedId) {
  return axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  );
}

export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds').then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
