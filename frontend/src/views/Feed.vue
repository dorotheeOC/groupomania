<template>
  <section id="main">    
      <SearchAll v-model="search"/>
      <div class="d-md-flex">
        <FavNav />
        <div class="container">
          <small><p class="alert text-center pt-1 mx-auto" v-if="alert">{{reportMsg}}</p></small>
          <a class="button-edit d-md-block text-white mx-auto" @click="editOnePost">
            <i class="fas fa-plus text-white p-0"></i> <span>Ecrire un post</span> 
          </a>          
          <Pagination />
          <Post />
        </div>
        
      </div>
     
    </section>
</template>

<script>
import SearchAll from '../components/SearchAll'
import FavNav from '../components/FavNav'
import Post from '../components/Post'
import Pagination from '../components/Pagination'

import store from '../store'
import { mapState } from "vuex";


export default {
  name: 'Feed',
  components: { SearchAll, Post, FavNav, Pagination },
  computed: {
      ...mapState({
        search: "search",
        alert: "alert",
        reportMsg: "reportMsg",
      }),
  },       
  beforeMount() {
    if(store.state.auth) {
      store.state.userId = (JSON.parse(localStorage.getItem('jwt'))).userId
      console.log('Online user:', store.state.userId)
      this.$http.get('users/' + store.state.userId)
      .then((response) => { 
        response.json().then((data) => {
          store.state.currentUser = data;
        })
      })
      .catch(error => {error})
    } else {
      this.$router.push("/");
      localStorage.clear();
    }
  },
  beforeDestroy() {
    store.state.search.query = null;
    store.state.posts = [];
    store.state.pagination = [];
  },
  methods: {
    editOnePost() {
      this.$router.push('/ckeditor');
    }
  }
}

</script>