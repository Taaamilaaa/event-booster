import ApiService from './api-service';
import cardTemplate from '../templates/card-image.hbs';
import { Notify } from 'notiflix';
import Pagination from 'tui-pagination';

const debounce = require('lodash.debounce');
const apiService = new ApiService();
const refs = {
    searchFormCountry: document.querySelector('#js-select-country'),
    container: document.querySelector('.container-list'),
    searchFormEvent: document.querySelector('#js-input-event'),
};

refs.searchFormCountry.addEventListener('change', debounce((onSearch), 500));
refs.searchFormEvent.addEventListener('input', debounce((onSearchEvent), 500));

function onSearchEvent(event) {
    event.preventDefault();
    apiService.query = refs.searchFormEvent.value
    apiService.resetPage();
    apiServisesRenderTui()
};
function onSearch() {
    let selectedEl = refs.searchFormCountry.
        options[refs.searchFormCountry.options.selectedIndex].value;
    apiService.queryCountry = selectedEl;
    apiService.resetPage();
    apiServisesRenderTui();
};
async function apiServisesRenderTui() {
    try {
        await apiService.fetchApi().then(res => {
            if (typeof (res.data._embedded.events) === 'object') {
                let data = res.data.page
                pagination(data);
                removeEvents();
                renderEvents(res.data._embedded.events);
            }
        });
    } catch {
        Notify.failure(`Ops! We couldn't found events. Please, use new keyword or choose other сountry.`,
            { width: "310px", distance: "20px", borderRadius: "10px", fontFamily: "Montserrat", fontSize: "15px", useGoogleFont: true, timeout: 3000, });
    }
};
function renderEvents(event) {
    refs.container.insertAdjacentHTML('beforeend', cardTemplate(event))
};

function removeEvents() {
    refs.container.innerHTML = ''
};

function pagination(data) {
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
                '</a>'
        }

    };
    const pagination = new Pagination('.tui-pagination', options);
    pagination.on('afterMove', (event) => {
        apiService.Page = event.page;
        apiServisesRenderTui();
    });
};

