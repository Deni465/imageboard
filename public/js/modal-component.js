import * as Vue from "./vue.js";
import showComment from "./comment-modal.js";

const selectCard = {
    data() {
        return {
            card: {
                id: "id",
                url: "url",
                username: "username",
                title: "title",
                description: "description",
                created_at: "created_at",
            },
        };
    },
    props: ["id"],
    template: `
    <div id="overlay">
        <div class="cardAndComment">
            <div class="overlay-card">
                <h4 @click="closeCard">X</h4>
                <img v-bind:src="card.url" v-bind:alt="card.description"/>
                <h3>{{ card.title }}</h3>
                <p class="oc-description">{{ card.description }}</p>
                <p class="oc-userstamp">Uploaded by <strong>{{ card.username }}</strong> on {{ card.created_at }}</p>
            </div>
            <div>
                <show-comment :image_id="this.id"></show-comment>
            </div>
        </div>
    </div>
    `,
    mounted() {
        let id = this.id;

        let fetchPath = `/cards/${id}`;

        fetch(fetchPath)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.card = data[0];
            });
    },

    components: {
        "show-comment": showComment,
    },
    methods: {
        closeCard() {
            this.$emit("close");
        },
    },
};

export default selectCard;
