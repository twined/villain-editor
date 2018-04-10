<template>
  <div id="app">
    <VillainEditor />
  </div>
</template>

<script>
import VillainEditor from './components/VillainEditor'

export default {
  name: 'app',
  components: {
    VillainEditor
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
