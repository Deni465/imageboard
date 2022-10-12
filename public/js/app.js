import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            headline: "My Image Board",
            cards: [],
            headlineCssClass: "headline",
        };
    },

    mounted() {
        this.state = "mounted";

        fetch("/cards")
            .then((res) => res.json())
            .then((cards) => {
                this.cards = cards;
                console.log(cards);
            });
    },
}).mount("#main");
