<template>
  <div>
    <section id="main">
      <h2 class="font-weight-bold text-center pb-1 px-4 mx-auto mt-4 title">Profil</h2>
      <Profile v-model="currentUser"/>
    </section>
  </div>
</template>
<script>

import Profile from '../components/Profile'

import { mapState } from "vuex";

export default {
    name: 'login',
    components: { Profile, },
    computed: {
        ...mapState({
            currentUser: "currentUser",
        }),
    },
}
</script>

<style lang="scss">

</style>