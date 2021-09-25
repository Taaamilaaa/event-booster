import newModalTemplate from '../templates/newModal';
import cardTemplate from '../templates/card-image.hbs';

import ApiService from './api-service';
import Pagination from 'tui-pagination';
import { Notify } from 'notiflix';
import closeModal from './newModalOpen'

const apiService = new ApiService();
let nameEvent = '';

const refs = {
    modal: document.querySelector('.modal'),
    modalOverlay: document.querySelector('.lightbox'),
    eventEl: document.querySelector('.container-list'),
    closeBtn: document.querySelector('.modal__close-btn'),

}


refs.eventEl.addEventListener('click', onEventClickRender);

function onEventClickRender(event) {
    if (event.target.className === 'container-list' || event.target.className === 'container-items') {
    return;
  }
  if (event.target.tagName === 'P') {
    return
    }
    apiService.id = event.target.parentNode.id || event.target.parentNode.parentNode.id;
    apiServicesRenderId();
    
}

async function apiServicesRenderId() {
  try {
      await apiService.fetchApiId().then(res => {
      nameEvent = res.data.name;
          if (typeof res.data === 'object') {
          
        renderEvents(res.data);
      }
    });
  } catch (error) { }
}
function renderEvents(event) {

    refs.modal.insertAdjacentHTML('beforeend', newModalTemplate(event));
    

 let moreAuthorBtn = document
    .querySelector('.more-author__btn')
    .addEventListener('click', moreAuthorSearch);
};

async function moreAuthorSearch() {

  apiService.query = nameEvent;
  try {
    await apiService.fetchApi().then(res => {
      if (typeof (res.data._embedded.events) === 'object') {
        removeEvents()
        renderMoreEvents(res.data._embedded.events);
        closeModal()
        paginations(res.data.page);
      }
    });
  } catch {
    Notify.failure(`We couldn't found more events.`,
      { width: "310px", distance: "20px", borderRadius: "10px", fontFamily: "Montserrat", fontSize: "15px", useGoogleFont: true, timeout: 3000, });
  }
};

function renderMoreEvents(event) {
  refs.eventEl.insertAdjacentHTML('beforeend', cardTemplate(event));
}


function paginations(data) {
  const options = {
    totalItems: data.totalElements,
    itemsPerPage: data.size,
    visiblePages: 5,
    page: data.number,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };
  const pagination = new Pagination('.tui-pagination', options);
  pagination.on('afterMove', event => {
    apiService.Page = event.page;
    moreAuthorSearch();
  });
}


function removeEvents() {
  refs.eventEl.innerHTML = '';
}
