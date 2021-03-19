<template>
<div class="d-md-flex justify-content-center align-items-center my-4">
    <button class="btn btn-primary btn-sm my-sm-0" @click.prevent="back" v-if="visible">Tous les posts</button>
    <ul class="pagination pagination-sm justify-content-center my-0 mx-4">
        <li class="page-item"  v-for="(page, index) in pagination" :key="page">
            <a class="page-link" :class="'page-link--'+ index" @click.prevent="getPage(index)" >{{page}}</a>
        </li>
    </ul>
</div>
</template>
<script>
import store from '../store';
import { mapState, mapGetters } from "vuex";

export default {
    name: 'Pagination',
    computed: {
        ...mapState({
            visible: "visible"
        }),
        ...mapGetters({
            pagination: "pagination",
            search: "search"
        }),
    },
    methods: {
        getPage(index) {
            this.$http.get(store.state.search.query === null? 'posts?page=' + index : 'posts?search=' + store.state.search.query + '&page=' + index)
            .then((response) => {
                response.json().then((data) => { 
                    store.state.posts = data.response.posts;
                    const allPages = document.querySelectorAll("li.page-item")
                    for(let page of allPages) {
                        if(page.classList.contains("active")) {
                        page.classList.remove("active")
                        }
                    }
                    const pageLink = document.querySelector("a.page-link--" + index);
                    const pageItem = pageLink.parentNode;
                    pageItem.classList.add("active")
            })  
        })
            .catch(error => {error})
        },
        back() {
            store.state.posts = {}
            store.state.pagination =[]
            this.$http.get('posts?page=0')
            .then((response) => { 
                response.json().then((data) => { 
                    console.log(data)
                    store.state.visible = false;
                    store.state.search.query = null;
                    store.state.posts = data.response.posts;
                    store.state.totalItems = data.response.totalItems;
                    store.state.totalPages = Math.ceil(store.state.totalItems / 5);
                    let index = 0;
                    while(index <= store.state.totalPages -1) {
                        index++;
                        store.state.pagination.push(index)
                    }
                })  
            })
            .catch(error => {error})
            console.log('calcul', store.state.totalItems)
            console.log('calcul', store.state.totalPages)
        }
    }
}
</script>
<style lang="scss">
    button {
        height: fit-content;
    }
</style>