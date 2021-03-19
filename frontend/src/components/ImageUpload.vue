<template>
<div>
  <form class="d-flex justify-content-center align-items-center" @submit.prevent="onSubmit" enctype="multipart/form-data">
    <div class="upload-btn d-flex flex-column justify-content-center align-items-center">
      <a><i class="fas fa-folder-open"></i>Modifier</a>
      <input type="file" ref="file" @change="onSelect">
    </div>
      <button class="btn btn-primary btn-sm">Submit</button>
  </form>
  <small>
    <p class="muted text-center m-0 p-0" v-if="file">{{file.name}}</p>
  </small>
</div>
</template>
<script>
import store from '../store';
import { mapState, mapGetters } from "vuex";

export default {
  name: "ImageUpload",
  computed: {
    ...mapState({
        file: "file",
    }),
    ...mapGetters({
      currentUser: "currentUser"
    })
  },
  methods: { 
    onSelect() {
      const file = this.$refs.file.files[0];
      store.state.file = file;
    },
    onSubmit() {
      const formData = new FormData();
      formData.append('file', store.state.file);
      formData.append('userId', store.state.userId);
        this.$http.post('upload/', formData, {headers: {'Content-Type': 'application/json'}})
        .then((response) => {
          console.log(response)
          store.state.currentUser.userImage = {name: response.body.file};
          store.state.file = '';
        })
        .catch(() => {
          store.state.alert = true;
          store.state.error = 'Une erreur s\'est produite';
          setTimeout(() => { store.state.alert = false; }, 2000);
        })
    }     
  }   
}
</script>
<style lang="scss">
  .upload-btn {
    position: relative;
    padding: 1.5rem 0;
    width: 6rem;
    & input[type=file] {
      opacity: 0;
      width: 6rem;
      z-index: 1;
      position: absolute;
      cursor: pointer;
    }
    & a {
      width: 6rem;
      z-index: 0;
      position: absolute;
    }
  }
</style>