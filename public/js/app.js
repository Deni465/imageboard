import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            message: "Please upload a file",
            headline: "Image Board",
            cards: [],
            headlineCssClass: "headline",
            newImage: {
                title: "",
                description: "",
                username: "",
                file: undefined,
            },
        };
    },
    methods: {
        upload(e) {
            const form = e.currentTarget;
            console.log({ form });

            // get the file input
            // check its files.
            // if no files, set error message!
            const fileInput = form.querySelector("input[type=file]");
            console.log(fileInput.files);

            if (fileInput.files.length < 1) {
                this.message = "You must first select a file!";
                return;
            }

            const myFormData = new FormData(form);

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
        },
        setFile(e) {
            console.log("were here");
        },
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
