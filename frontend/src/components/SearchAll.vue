<template>
<div class="navbar navbar-lg-expand justify-content-center mb-4">
    <form class="form-inline justify-content-center search-bar" @submit.prevent="getSearch()">
        <label class="search-label d-flex align-items-center m-0" for="search">
            <span class="sr-only">Chercher</span>
        </label>
            <input type="search" class="custom-input form-control mr-sm-2" placeholder="Rechercher" name="search" id="search"  v-model="search.query">
        <button class="btn btn-primary btn-sm my-sm-0 ml-2"><i class="fas fa-search p-0 m-0 text-white" aria-label="chercher"><span class="sr-only">Chercher</span></i></button>
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
        })
    },
    beforeDestroy() {
        store.state.visible = false;
    },
    methods: {
        getSearch() {
            store.state.pagination = [];
            store.state.posts = [];
            store.state.visible = true; //pagination tous les posts
            if(store.state.search.query !== null && store.state.search.query !=='') {
                this.$http.get(store.state.favId === 0 ?'posts?search=' + store.state.search.query : 'posts?search=' + store.state.search.query + '&id=' + store.state.favId)
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