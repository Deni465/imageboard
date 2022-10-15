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
            <div class="overlay-card">
                <h4 @click="closeCard">X</h4>
                <img v-bind:src="card.url" v-bind:alt="card.description"/>
                <h3>{{ card.title }}</h3>
                <p class="oc-description">{{ card.description }}</p>
                <p class="oc-userstamp">Uploaded by {{ card.username }} on {{ card.created_at }}</p>
            </div>
        </div>
    `,
    mounted() {
        console.log("mounted");

        let id = this.id;

        let fetchPath = `/cards/${id}`;

        fetch(fetchPath)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("FETCH data :", data);
                this.card = data[0];
            });
    },
    methods: {
        closeCard() {
            this.$emit("close");
        },
    },
};

export default selectCard;
