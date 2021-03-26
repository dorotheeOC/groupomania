<template>
    <section id="main">
        <h2 class="font-weight-bold text-center pb-1 px-4 mx-auto mt-4 title">Tableau de bord</h2>
        <div class="col-lg-6 my-auto mx-auto">
            <div class="card" >
                <div class="card-header">
                    <div class="marked">
                        <h3 class="font-weight-bold py-0 m-0">Post</h3>
                        <div class="gradient-marked mt-2"></div>
                    </div>
                </div>
                    <ul class="list p-1">
                        <p class="p-4" v-if="postsReported.length === 0">Rien à signaler !</p>
                        <li class="list-report post-report my-3 px-4 p-1" v-for="post in postsReported" :key="post.id" @click="getOnePost(post.id)">
                            <div class="d-lg-flex justify-content-lg-between align-items-center">
                                <div>
                                    {{post.title}}
                                    <small>
                                        <p class="report-author font-weight-bold my-0">{{post.author}}</p>
                                    </small>
                                </div>
                                <a class="font-weight-bold" @click="deletePost(post.id)">
                                    <i class="fas fa-trash"></i>Supprimer
                                </a>
                            </div> 
                        </li>
                    </ul>
                <div class="card-header">
                    <div class="marked">
                        <h3 class="font-weight-bold py-0 m-0">Comments</h3>
                        <div class="gradient-marked mt-2"></div>
                    </div>
                </div>
                    <ul class="list p-1">
                        <p class="p-4" v-if="commentsReported.length === 0">Rien à signaler !</p>
                        <li class="list-report my-3 px-4 p-1" v-for="comment in commentsReported" :key="comment.id">
                            <div class="d-lg-flex justify-content-lg-between align-items-center">
                                <div>
                                    {{comment.commentText}}
                                    <small>
                                        <p class="report-author font-weight-bold my-0">{{comment.author}}</p>
                                    </small>
                                </div>
                                <a class="font-weight-bold" @click="deleteComment(comment.id, comment.postId)">
                                    <i class="fas fa-trash"></i>Supprimer
                                </a>
                            </div>
                        </li>
                    </ul>
            </div>
        </div>
    </section>
</template>
<script>
import store from '../store';
import { mapGetters } from "vuex";

export default {
    name: 'Post',
    computed: {
        ...mapGetters({
            postsReported: "postsReported",
            commentsReported: "commentsReported",
        }),
    },
    beforeMount() {
        store.state.postsReported = [];
        store.state.commentsReported = [];
        store.state.userId = (JSON.parse(localStorage.getItem('jwt'))).userId
        console.log('Online user:', store.state.userId)
        this.$http.get('users/' + store.state.userId)
        .then((response) => { 
        response.json().then((data) => {
            store.state.currentUser = data;
        })
        })
        .catch(error => {error})
    },
    mounted() {
        this.$http.get('posts')
        .then((response) => { 
            response.json().then((data) => {
               for(let post of data.post) {
                   if(post.reported === true) {
                       store.state.postsReported.push(post);
                   }
               }
            })  
        })
        .catch(error => {error})
        this.$http.get('comments')
        .then((response) => { 
            response.json().then((data) => { 
                store.state.commentsReported = data;
            })  
        })
        .catch(error => {error})
	},
    methods: {
        getOnePost(id) {
            this.$router.push(`posts/${id}`);
        },
        deletePost(id) {
            this.$http.delete('posts/' + id)
            .then(() => { 
                for (let i = 0; i < store.state.postsReported.length; i++) {
                    if (store.state.postsReported[i].id === id) {
                        const index = i
                        store.state.postsReported.splice(index, 1)
                    }
                }
            })
            .catch(error => {error})
        },
        deleteComment(id, postId) {
            this.$http.delete('posts/' + postId + '/comments/' + id)
            .then(() => { 
                for (let i = 0; i < store.state.commentsReported.length; i++) {
                    if (store.state.commentsReported[i].id === id) {
                        const index = i
                        store.state.commentsReported.splice(index, 1)
                    }
                }
            })
            .catch(error => {error})
        }
    }
}
</script>