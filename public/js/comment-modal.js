const showComment = {
    data() {
        return {
            newComment: {
                comment: "",
                username: "",
            },
            comments: [],
        };
    },
    props: ["image_id"],
    template: `
    <div class="overlay-comment">
        <h4 @click="closeComments">X</h4>
        <form action="/comment" method="post">
            <div>
                <label for="username">Your Username</label>
                <input type="text" v-model="newComment.username" id="username" />
            </div>
            <div>
                <label for="comment" >Your Comment</label>
                <input type="text" id="comment" v-model="newComment.comment" name="comment"/>
            </div>
            <div class="commentButton">
                <input type="button" value="Comment" class="btn-submit" @click="insertComment"/>
            </div>
        </form>
          <div v-for="comment in comments" class="comment">
                <p>{{ comment.username }}</p>
                <p>{{ comment.comment }}</p>
                <p>{{ comment.created_at }}</p>
            </div>
    </div>
    `,
    mounted() {
        let { image_id } = this;

        let fetchPath = `/comment/${image_id}`;

        fetch(fetchPath)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.comments = data;
            });
    },
    methods: {
        closeComments() {
            this.$emit("close-comments");
        },
        insertComment() {
            console.log(
                "addComment() this.newComment.comment",
                this.newComment.comment
            );
            // prepares the FormData
            const formData = new FormData();

            formData.append("comment", this.newComment.comment);
            formData.append("username", this.newComment.username);

            fetch(`/comment/${this.image_id}`, {
                method: "POST",
                body: formData,
            })
                .then((res) => {
                    return res.json();
                })
                .then((commentData) => {
                    console.log("commentData :", commentData);
                    this.comments.unshift(commentData[0]);
                })
                .catch((err) => {
                    console.log("err :", err);
                    alert("Error adding comment!");
                });
        },
    },
};

export default showComment;
