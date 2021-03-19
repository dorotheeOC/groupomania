<template>
  <div>
    <Menu />
    <router-view></router-view>
    <footer><p class="text-center font-weigth-light p-0 m-0">{{ footer }}</p></footer>    
  </div>
</template>
<script>

import Menu from './components/Menu.vue'
import { mapState, mapGetters } from "vuex";

export default {
  components: { Menu, },
  computed: {
		...mapState({
			auth: "auth"
		}),
    ...mapGetters({
      footer: "footer"
    })
	},
} 
</script>