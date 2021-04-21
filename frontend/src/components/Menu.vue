<template>
  <header class="bg-white">
    <h1 class=" navbar-brand d-flex justify-content-center" @click.prevent>
      <img src="../assets/icon-black.png" width="55" class="d-inline-block align-top" alt="logo">Groupomania</h1>
    <nav class="navbar navbar-expand-lg navbar-light p-0">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav" v-if="auth">
          <ul class="navbar-nav">
            <li class="nav-item active" v-if="currentUser.role === 'admin'">
              <router-link to="/report" class="nav-link text-center">
                Tableau de bord
                <span class="badge badge-pill badge-danger">{{postsReported.length + commentsReported.length}}</span>
              </router-link>
            </li>
            <li class="nav-item active">
              <router-link to="/feed" class="nav-link text-center">Fil d'actualité</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/profile" class="nav-link text-center">Profil</router-link>
            </li>
            <li class="nav-item">
              <span class="nav-link text-center" @click.prevent="logout">Se déconnecter</span>
            </li>
          </ul>
      </div>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav" v-else>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link text-center">Connexion</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup" class="nav-link text-center">Inscription</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: 'Menu',
  computed: {
    ...mapState({
      auth: "auth",
      currentUser: "currentUser"
    }),
    ...mapGetters({
      postsReported: "postsReported",
      commentsReported: "commentsReported",
    }),
	},
	methods: {
		...mapActions(["logout"]),
	},
}

</script>
<style lang="scss">

</style>