<template>
  <div>
    <section id="main">
      <h2 class="font-weight-bold text-center pb-1 px-4 mx-auto mt-4 title">Profil</h2>
      <SingleProfile/>
    </section>
  </div>
</template>
<script>

import SingleProfile from '../components/SingleProfile'

export default {
  name: 'SingleUser',
  components: { SingleProfile },
}
</script>

<style lang="scss">

</style>