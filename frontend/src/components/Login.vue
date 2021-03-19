<template>
    <Form />
</template>
<script>
import store from '../store';
import Form from "./Form.vue";

export default {
  name:'Login',
  components: { Form },
  mounted() {
    store.state.login = true
  }
};
</script>