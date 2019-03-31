<template lang="pug">
  .app-container
    Header
    router-view
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: "App",
  components: {
    Header
  }
}
</script>


<style lang="scss">
</style>
