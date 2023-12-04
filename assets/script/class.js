'use strict';

class Score {
    #date;
    #hits;
    #percentage;

    constructor(hits, totalWords) {
        this.#date = new Date();
        this.#hits = hits;
        this.#percentage = (hits / totalWords) * 100;
    }

    get date() {
        return this.#date;
    }

    get hits() {
        return this.#hits;
    }

    get percentage() {
        return this.#percentage;
    }
}