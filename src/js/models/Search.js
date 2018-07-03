import axios from 'axios';
import {
    key,
    proxy
} from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
        this.results;
    }

    getResults(callback) {
        try {
            const res = axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`)
                .then((res) => {

                    if (res) {
                        this.results = res.data.recipes;
                    }

                    if (callback) {
                        callback();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }
};