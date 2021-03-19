<template>
<div class="navbar navbar-lg-expand justify-content-center mb-4">
    <form class="form-inline justify-content-center search-bar" @submit.prevent="getSearch()">
        <label class="d-flex align-items-center m-0" for="search">
            <input type="search" class="custom-input form-control mr-sm-2" placeholder="Rechercher" name="search" aria-label="Search" v-model="search.query">
        </label>
        <button class="btn btn-primary btn-sm my-sm-0"><i class="fas fa-search p-0 m-0 text-white"></i></button>
    </form>
</div>
</template>
<script>
import store from '../store';
import { mapState } from "vuex";

export default {
    name: 'SearchAll',
    computed: {
        ...mapState({
            search: "search",
            userFav: "userFav"
        })
    },
    mounted() {
        console.log(store.state.userId)
        this.$http.get('users/' + store.state.userId + '/follows?id=' + store.state.userId)
        .then((response) => { 
        response.json()
            .then((data) => {
                console.log(data)
                if(data !== null) {
                    store.state.userFav = data
                    console.log('Favorits', store.state.userFav)
                }
            })  
        })
        .catch(error => {error})
    },
    beforeDestroy() {
        store.state.visible = false;
        store.state.userFav = [];
    },
    methods: {
        getSearch() {
            store.state.pagination = [];
            store.state.posts = [];
            store.state.visible = true; //pagination tous les posts
            if(store.state.search.query !==null && store.state.search.query !=='') {
                this.$http.get('posts?search=' + store.state.search.query)
                .then((response) => { 
                    response.json().then((data) => { 
                        store.state.posts = data.response.posts;
                        store.state.totalPages = data.response.totalPages;
                        store.state.search.query = null;
                    })  
                })
                .catch(error => {error})
            }    
        },
    }
}
</script>