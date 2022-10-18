const showComment = {
    data() {
        return {
            comment: {
                comment: "comment",
                username: "username",
                created_at: "created_at",
            },
            comments: [],
        };
    },
    props: ["image_id"],
    template: `
    <div class="overlay-comment">
        <h4 @click="closeCard">X</h4>
        <form action="/comments" method="post">
            <div>
                <label for="username">Your Username</label>
                <input type="text" id="username" />
            </div>
            <div>
                <label for="comment">Your Comment</label>
                <input type="text" id="comment" />
            </div>
            <div class="commentButton">
                <input type="submit" value="Comment" class="btn-submit" />
            </div>
        </form>
    </div>
    `,
    mounted() {
        let id = this.id;

        let fetchPath = `/comment/${id}`;

        fetch(fetchPath)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.comment = data[0];
            });
    },
    methods: {
        closeCard() {
            this.$emit("close");
        },
    },
};

export default showComment;
