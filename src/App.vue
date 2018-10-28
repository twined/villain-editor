<template>
  <div id="app">
    <VillainEditor
      :json="json"
      :templates="templates"
      :templateMode="false"
    />
  </div>
</template>

<script>
import VillainEditor from './components/VillainEditor'

import templates from './templates/'

export default {
  name: 'app',
  components: {
    VillainEditor
  },
  data () {
    return {
      templates
    }
  },

  methods: {}
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
