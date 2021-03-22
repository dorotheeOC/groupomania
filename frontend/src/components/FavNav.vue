<template>
    <div>
        <div class="dropdown d-md-none d-flex flex-column justify-content-center align-items-center">
            <p class="font-weight-bold current-user text-center my-0 mx-auto">Hello {{currentUser.email}} !</p>
            <button class="btn btn-secondary btn-sm dropdown-toggle px-4" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Abonnements
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <p class="dropdown-item text-muted p-0 m-0" v-if="userFav.length === 0">Aucun abonnement</p>
                <a class="dropdown-item" v-for="user in userFav" :key="user.id" @click="getFav(user.userFollowed)">{{user.userEmail}}</a>
            </div>
        </div>
        <div class="card nav-fav d-none d-md-block pl-2 col-md-6 py-2">
            <p class="font-weight-bold current-user text-center my-0 mx-auto">Hello {{currentUser.email}} !</p>
            <div class="marked mx-auto my-1">
                <p class="font-weight-bold my-0">Abonnements</p>
                <div class="gradient-marked"></div>
            </div>
            <ul class="nav flex-column">
                <p class="nav-link text-muted mx-auto" v-if="userFav.length === 0">Aucun abonnement</p>
                <li class="nav-item mx-auto" v-for="user in userFav" :key="user.id">
                    <a class="nav-link" @click="getFav(user.userFollowed)">{{user.userEmail}}</a>
                </li>
            </ul>
        </div>
    </div>
    
</template>
<script>
import store from '../store';
import { mapState } from "vuex";

export default {
    name: 'FavNav',
    computed: {
            ...mapState({
                userFav: "userFav",
                currentUser: "currentUser"
            })
        },
    mounted() {
        this.$http.get('users/' + store.state.userId + '/follows?id=' + store.state.userId)
        .then((response) => { 
            response.json()
                .then((data) => {
                    if(data !== null) {
                        store.state.userFav = data
                        console.log('Favorits', store.state.userFav)
                    }
                })  
            })
        .catch(error => {error})
    },
    methods: {
        getFav(id) {
            store.state.posts = [];
            store.state.pagination = [];
            store.state.visible = true; //pagination tous les posts
            this.$http.get('posts?id=' + id)
            .then((response) => { 
                response.json().then((data) => { 
                    store.state.posts = data.response.posts;
                    store.state.favId = id;
                })  
            })
            .catch(error => {error})
        }
    }
}
</script>
