import axios from 'axios';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const API_KEY = 'YsjNnwTdurU18i07JYk9pbaKz6rXoV2D';

export default class ApiService {

    constructor() {
        this.searchQuery = '';
        this.countryCode = '';
        this.page = 0;
        this.id = '';
    };


    fetchApiStart() {
        const params = new URLSearchParams({
            size: '24',
            page: this.page,
            sort: 'random',
            countryCode: 'ES',

        })
        const url = `${BASE_URL}events.json?&apikey=${API_KEY}&${params}`;
        return axios.get(url);

    };
    fetchApi() {

        const searchParams = new URLSearchParams({
            keyword: this.searchQuery,
            size: '24',
            countryCode: this.countryCode,
            page: this.page,
        })

        const url = `${BASE_URL}events.json?&apikey=${API_KEY}&${searchParams}`;
        return axios.get(url);
    };

    fetchApiId() {
        const id = this.id;

        const url = `${BASE_URL}/events/${id}?apikey=${API_KEY}&locale=*`
        return axios.get(url);

    };
    get queryCountry() {
        return this.countryCode.trim();
    };
    set queryCountry(newQueryCountry) {
        this.countryCode = newQueryCountry;
    }
    get query() {
        return this.searchQuery.trim();
    };
    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    get Page() {
        return this.searchPage.trim();
    };
    set Page(newPage) {
        this.page = newPage;
    }

    get searchId() {
        return this.searchId.trim();
    };
    set searchId(newid) {
        this.id = newid;
    }
    resetPage() {
        this.page = 0;
    }
    incrementPage() {
        this.page += 1;
    }
}