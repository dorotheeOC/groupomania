<template>
    <Form />
</template>
<script>
import store from '../store';
import Form from "./Form.vue";

export default {
  name: 'Signup',
  components: { Form },
  mounted() {
    store.state.login = false
  }
};
</script>