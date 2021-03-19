<template>
    <div class="card-footer bg-transparent">
        <form name="form" @submit.prevent="editComment">
            <div class="form-group">
                <div class="marked">
                    <label for="commentText">Ecris ton commentaire sympa !</label>
                    <div class="gradient-marked"></div>
                </div>
                <input type="text" class="form-control" name="commentText" v-model="comment.commentText"/>
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
            this.$emit('input', store.state.comment);
            this.$http.post('posts/' + this.postId + '/comments', {
                userId: store.state.userId, commentText: store.state.comment.commentText
            }, {headers: {'Content-Type': 'application/json'}})
            .then((response) => {
                store.state.post.commented++
                console.log(response.body)
                store.state.post.postComment.push(response.body)
                store.state.comment.commentText = '';
            })
            .catch(error => {error})
        }
    }
}
</script>