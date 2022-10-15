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
            <div class="card">
                <h4 @click="closeCard">X</h4>
                <img v-bind:src="card.url" v-bind:alt="card.description"/>
                <h4>{{ card.title }}</h4>
                <p>{{ card.description }}</p>
                <p>{{ card.username }}</p>
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
