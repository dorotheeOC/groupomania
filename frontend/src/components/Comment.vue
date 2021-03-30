<template>
    <div class="card-footer bg-transparent">
        <form name="form" @submit.prevent="editComment">
            <div class="form-group">
                <div class="marked">
                    <p for="commentText">Ecris ton commentaire sympa !</p>
                    <div class="gradient-marked"></div>
                </div>
                <label for="commentText"><span class="sr-only">Commentaire</span></label>
                <input type="text" class="form-control" id="commentText" name="commentText" v-model="comment.commentText"/>
            </div>
            <div class="form-group d-flex justify-content-end">
            <button class="btn btn-outline-primary btn-sm">
                <span>Envoyer</span>
            </button>
            </div>
        </form>
    </div>
</template>
<script>
import store from '../store';
import { mapState } from "vuex";

export default {
    name: 'Comment',
    data() { 
        return {
            postId: this.$route.params.id,
        }
	},
    computed: {
        ...mapState({
            comment: "comment"
        }),
    },
    methods: {
        editComment() {
            this.$http.post('posts/' + this.postId + '/comments', {
                userId: store.state.userId, commentText: store.state.comment.commentText
            }, {headers: {'Content-Type': 'application/json'}})
            .then((response) => {
                store.state.post.commented++
                store.state.post.postComment.push(response.body)
                store.state.comment.commentText = '';
            })
            .catch(error => {error})
        }
    }
}
</script>