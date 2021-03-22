<template>
<div class="mx-4">
    <div class="col-lg-6 my-auto mx-auto" v-if="posts.length === 0">
        <div class="card">
            <p class="card-text p-4">Aucun résultat</p>
        </div>
    </div>
    <div class="post col-lg-6 my-4 mx-auto" v-for="(post) in posts" :key="post.id">   
        <div class="card">
            <div class="post-title pl-4 pt-4 my-0">
                <h3 class="card-text my-0">{{post.title}}</h3>
                    <div class="card-text d-lg-flex align-items-center m-0">
                        <div class="mr-2">
                            <small class="text-muted" v-if="post.userId !== null">De 
                            <a aria-label="Voir le profil" @click="getProfile(post.userId)">{{post.author}} </a>
                            </small>
                            <small class="text-muted" v-else>Utilisateur supprimé </small>
                            <small class="text-muted" v-if="post.createdAt">le {{dateFormat(post.createdAt)}}</small>
                            <small class="text-muted" v-else>maintenant</small>
                        </div>
                    </div>
            </div>
            <div class="card-body">
                <div class="card-text post-content" v-html="post.postContent"></div>
                <button @click.stop="getOnePost(post.id)" class="btn btn-outline-primary btn-sm" v-if="post.createdAt">Commenter</button>
                <small>
                    <a class="report text-muted ml-3 p-1" @click="reportPost(post.id)" v-if="currentUser.role === 'user' && currentUser.id != post.userId">
                        <i class="fas fa-exclamation-circle"></i>
                        <span>Signaler</span>
                    </a>
                </small>
                <small>
                    <a class="report text-muted ml-3 p-1" @click.prevent="deleteOnePost(post.id)" v-if="currentUser.role === 'admin' && post.createdAt || currentUser.id === post.userId && post.id">
                        <i class="fas fa-trash"></i>
                        <span>Supprimer</span>
                    </a>
                </small>
                <div class="d-flex justify-content-end stat">
                <span class="card-text my-0 ml-2" ><i class="far fa-heart"></i>{{ post.liked }}</span>
                <span class="card-text my-0"><i class="far fa-comment-dots" ></i>{{post.commented}}</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>

import store from '../store';
import { mapState, mapGetters } from "vuex";

export default {
    name: 'Post',
    computed: {
      ...mapState({
        currentUser: "currentUser",
      }),
      ...mapGetters({
        userId: "userId",
        posts: "posts", //donnée réactive (delete one post)
      }),
    },
	mounted() {
        this.$http.get('posts?page=0')
        .then((response) => { 
            response.json().then((data) => { 
                console.log(data)
                store.state.posts = data.response.posts;
                store.state.totalItems = data.post.length
                store.state.totalPages = data.response.totalPages
                let index = 0;
                while(index <= store.state.totalPages -1) {
                    index++;
                    store.state.pagination.push(index)
                }
            })  
        })
        .catch(error => {error})
        console.log('totalItems', store.state.totalItems)
        console.log('totalPages', store.state.totalPages)
	},
    methods: {
        dateFormat(date) {
            const day = date.substring(8, 10);
            const month = date.substring(5, 7);
            const year = date.substring(0, 4);
            return `${day}.${month}.${year}`
        },
        
        getOnePost(id) {
            this.$router.push(`posts/${id}`);
        },
        reportPost(id) {
            this.$http.put('posts/' + id, {reported: true}, {headers: {'Content-Type': 'application/json'}})
            .then(() => { 
                store.state.alert = true;
                store.state.reportMsg = 'Le signalement a bien été soumis !';
                setTimeout(() => { store.state.alert = false; }, 1500);
            })
            .catch(error => {error})
        },
        deleteOnePost(id) {
            this.$http.delete('posts/' + id)
            .then(() => { 
                this.$http.get('posts?page=' + store.state.currentPage - 1)
                .then((response) => { 
                    response.json().then((data) => { 
                    store.state.posts = data.response.posts;
                    })  
                })
                .catch(error => {error})
            })
            .catch(error => {error})
        },
        getProfile(id) {
            if(id !== store.state.userId && id !== null) {
                this.$http.get('users/' + id)
                .then((response) => { response.json()
                    .then(() => { 
                    this.$router.push(`users/${id}`);
                    })  
                })
                .catch(error => {error})
            } else {
                this.$router.push('/profile')
            }
        }
    }
}
</script>
<style lang="scss">

</style>