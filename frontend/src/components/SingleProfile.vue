<template>
<div class="mx-3">
    <div class="col-lg-6 my-4 mx-auto">
        <div class="card" >
            <div class="d-flex flex-column align-items-center profile-header p-4">
                <div class="img-frame">
                    <img :src="imageUrlUser" class="profile-img-card" alt="photo de profil" />
                </div>
                <div class="marked mt-3">
                    <p class="font-weight-bold">{{user.email}}</p>
                    <div class="gradient-marked"></div>
                </div>
                <button class="btn btn-primary btn-sm my-2" v-if="!following" @click="follow(user.id)">
                    <i class="fas fa-plus"></i><span>Suivre</span>
                </button>
                <button class="btn btn-outline-primary btn-sm my-2" v-else @click="follow(user.id)">
                    <i class="fas fa-minus"></i><span>Ne plus suivre</span>
                </button>
                <div class="d-flex justify-content-center mt-3">
                    <div class="profile-follow d-flex flex-column align-items-center mx-2 p-2">
                    <p class="display-4 m-0" v-if="user.userFollow !== null">{{user.userFollow.length}}</p>
                    <p class="display-4 m-0" v-else>0</p>
                    <small class="text-uppercase">abonnements</small>
                    </div>
                    <div class="profile-follow d-flex flex-column align-items-center mx-2 p-2">
                    <p class="display-4 m-0">{{user.followers}}</p>
                    <small class="text-uppercase">abonnés</small>
                    </div>
                </div> 
            </div>
            <div class="card-body d-lg-flex justify-content-center">
                <div class="mx-lg-4">
                    <h3 class="card-title">Prénom</h3>
                    <div class="d-flex align-items-end">
                    <p class="card-text info" v-if="user.firstName === null">indefini</p>
                    <p class="card-text info" v-else>{{user.firstName}}</p>
                    </div>
                </div>
                <div class="mx-lg-4">
                    <h3 class="card-title">Nom</h3>
                    <div class="d-flex align-items-end">
                    <p class="card-text info" v-if="user.lastName === null">indefini</p>
                    <p class="card-text info" v-else>{{user.lastName}}</p>
                    </div> 
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
    name: 'SingleProfile',
    data() { 
		return {
            userProfileId: this.$route.params.id,
		}
	},
    computed: {
        ...mapState({
            following: "following",
        }),
        ...mapGetters({
            user: "user",
            imageUrlUser: "imageUrlUser"
    }),
    },
	beforeMount() {
        this.$http.get('http://localhost:3000/api/users/' + this.userProfileId)
        .then((response) => { 
            response.json().then((data) => { 
                store.state.user = data
                console.log('favorite', store.state.currentUser.userFollow)
                for(let currentUserFav of store.state.currentUser.userFollow) {
                    if(currentUserFav.userFollowed === store.state.user.id) {
                        store.state.following = true;
                    }
                }
            })  
        })
        .catch(error => {error})
	},
    beforeDestroy() {
        store.state.following = false;
    },
    methods: {
        follow(id) {
            this.$http.post('http://localhost:3000/api/users/' + id + '/follows', {
                userId: store.state.userId,
                userEmail: store.state.user.email
            }, 
            {headers: {'Content-Type': 'application/json'}})
            .then((response) => { 
                console.log(response)
                store.state.user.followers += response.body.follow
                if(response.body.follow === 1) {
                    store.state.following = true;
                } else {
                    store.state.following = false;
                }
            })
            .catch(error => {error})
        }
    }
}
</script>
<style lang="scss">
.profile-img-card {
  border-radius: 8rem;
  width: 5rem;
}
</style>