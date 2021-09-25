import ApiService from './api-service';
import cardModal from '../templates/card-modal.hbs';
const apiService = new ApiService();
const refs = {
  containerModal: document.querySelector('.modal'),
  containerListModal: document.querySelector('.container-list'),
};
refs.containerListModal.addEventListener('click', openModalInfo);
function openModalInfo() {
  apiService.fetchApi().then(city => {
    refs.containerModal.insertAdjacentHTML('beforeend', cardModal(city.data._embedded.events));
  });
}
