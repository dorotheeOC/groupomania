<template>
<div class="mx-3 ">
  <div class="col-lg-6 my-4 mx-auto ">
    <div class="card" >
        <small><p class="alert text-center pt-1 mx-auto" v-if="alert">{{error}}</p></small>
        <div class="d-flex flex-column align-items-center profile-header pt-4">
          <div class="img-frame">
            <img :src="imageUrl" class="profile-img-card" />
          </div>
          <ImageUpload />
          <div class="marked mt-3">
            <p class="font-weight-bold">{{currentUser.email}}</p>
            <div class="gradient-marked"></div>
          </div>
          <div class="d-flex justify-content-center">
            <div class="profile-follow d-flex flex-column align-items-center mx-2 p-2">
              <p class="display-4 m-0" v-if="currentUser.userFollow.length > 0">{{currentUser.userFollow.length}}</p>
              <p class="display-4 m-0" v-else>0</p>
              <small class="text-uppercase">abonnements</small>
            </div>
            <div class="profile-follow d-flex flex-column align-items-center mx-2 p-2">
              <p class="display-4 m-0">{{currentUser.followers}}</p>
              <small class="text-uppercase">abonnés</small>
            </div>
          </div>
          <div class="mt-4">
            <a class="card-text" @click.prevent.stop="showInput"  v-if="!message"><i class="fas fa-edit"></i>Editer</a>
            <a class="card-text m-md-2" @click.prevent="confirmDelete" v-if="!message"><i class="fas fa-trash"></i>Supprimer le compte</a>
            <div class="alert-box mx-auto my-3" v-else>
              <p>Etes vous sûr(e) de vouloir supprimer ce compte ?</p>
              <div class="d-flex justify-content-center">
                  <button class="btn btn-primary btn-sm mr-2" @click.prevent="destroy" >Valider</button>
                  <button class="btn btn-outline-primary btn-sm" @click.prevent="cancel" >Annuler</button>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body pt-2">
          <form name="form" @submit.prevent="put">
            <div class="form-container d-flex justify-content-center">
              <div class="form-group mx-4">
                <label for="firstName">
                  <h5 class="card-title m-0">Prénom</h5>
                </label>
                <div class="d-flex align-items-end">
                  <p class="card-text info" v-if="currentUser.firstName === null">indefini</p>
                  <p class="card-text info" v-else>{{currentUser.firstName}}</p>
                </div>
                <input type="text" class="form-control" name="firstName" v-model="currentUser.firstName" placeholder="Prénom" v-if="visible"/>
              </div>
              <div class="form-group mx-4">
                <label for="lastName">
                  <h5 class="card-title m-0">Nom</h5>
                </label>
                <div class="d-flex align-items-end">
                  <p class="card-text info" v-if="currentUser.lastName === null">indefini</p>
                  <p class="card-text info" v-else>{{currentUser.lastName}}</p>
                </div>
                <input type="text" class="form-control" name="lastName" v-model="currentUser.lastName" placeholder="Nom" v-if="visible"/>
              </div>
            </div>
            <div class="form-group d-flex justify-content-center" v-if="visible">
              <button class="btn btn-primary btn-sm mx-2">
                <span>Enregistrer</span>
              </button>
              <button class="btn btn-outline-primary btn-sm mx-2" @click.prevent.stop="hideInput">
                <span>Annuler</span>
              </button>
            </div>
          </form>
         
        </div>
    </div>
  </div></div>
</template>
<script>
import ImageUpload from '../components/ImageUpload'

import store from '../store';
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: 'Profile',
  components: { ImageUpload },
  computed: {
    ...mapState({
      message: "message",
      visible: "visible",
      alert: "alert",
      error: "error"
    }),
    ...mapGetters({
      currentUser: "currentUser",
      userId: "userId",
      imageUrl: "imageUrl"
    }),
  },
	mounted() {
    this.$http.get('users/' + store.state.userId)
    .then((response) => { 
      response.json()
        .then((data) => { 
          store.state.currentUser = data
          console.log('currentuser', store.state.currentUser)
        })  
    })
    .catch(error => {error})
	},
  beforeDestroy() {
    store.state.visible = false;
    store.state.file = {};
    store.state.error = '';
  },
  methods: {
    ...mapActions(["showInput", "hideInput", "confirmDelete", "cancel"]),
    put() {
      const newInfo = {firstName: store.state.currentUser.firstName, lastName: store.state.currentUser.lastName}
      this.$http.put('users/' + store.state.userId, newInfo, {headers: {'Content-Type': 'application/json'}})
      .then(() => { 
        store.state.visible = false;
      })
      .catch(error => {error})
    },
    destroy() {
      this.$http.delete('users/' + this.userId)
      .then(() => { 
        store.state.auth = false;
        this.$router.push('/');
      })
      .catch(error => {error})
    }
  }
}
</script>
<style lang="scss">
.profile-img-card {
  height: 5rem;
}
.form-control {
  font-size: .75rem;
}
</style>