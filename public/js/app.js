import * as Vue from "./vue.js";
import selectCard from "./modal-component.js";
// import showComment from "./comment-modal.js";

Vue.createApp({
    data() {
        return {
            message: "Please upload a file",
            headline: "ORANGE SENSATION",
            cards: [],
            headlineCssClass: "headline",
            newImage: {
                title: "",
                description: "",
                username: "",
                file: undefined,
            },
            selectedCard: null,
            loadMore: true,
        };
    },
    components: {
        "select-card": selectCard,
        // "show-comment": showComment,
    },
    methods: {
        upload(e) {
            const form = e.currentTarget;
            // console.log("form", form);

            // get the file input
            // check its files.
            // if no files, set error message!
            const fileInput = form.querySelector("input[type=file]");
            console.log(fileInput);

            if (fileInput.files.length < 1) {
                this.message = "You must first select a file!";
                return;
            }

            const myFormData = new FormData();

            myFormData.append("title", this.newImage.title);
            myFormData.append("description", this.newImage.description);
            myFormData.append("username", this.newImage.username);
            myFormData.append("file", this.newImage.file);

            fetch(form.action, {
                method: "post",
                body: myFormData,
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.message) {
                        this.message = data.message;
                    }
                    if (data) {
                        this.cards.unshift(data);
                    }
                });
            form.reset();
        },
        setFile(e) {
            console.log("were here");
            this.newImage.file = e.target.files[0];
        },
        selectCard(id) {
            console.log("id :", id);
            this.selectedCard = id;
            document.body.classList.add("modal-open");
            history.pushState({}, "", `/selectCard/${id}`);
        },
        deselectCard() {
            this.selectedCard = null;
            document.body.classList.remove("modal-open");
            history.pushState({}, "", `/`);
        },
        getMoreImages() {
            const lowestId = this.cards[this.cards.length - 1].id;
            console.log("lowestId", lowestId);
            fetch(`/more-cards/${lowestId}`)
                .then((res) => {
                    return res.json();
                })
                .then((cards) => {
                    for (let card of cards) {
                        this.cards.push(card);
                        if (card.lowestId == card.id) {
                            this.loadMore = false;
                        }
                    }
                });
            // get lowestId
            // from the cards array
            // fetch from specific route
            // needs lowestId as param
            // push each new card to the data
        },
    },

    mounted() {
        this.state = "mounted";

        fetch("/cards")
            .then((res) => res.json())
            .then((cards) => {
                this.cards = cards;
                console.log("cards: ", cards);
                // if (cards.lowestId == cards.id) {
                //     this.loadMore = false;
                // }
            });
    },
}).mount("#main");
