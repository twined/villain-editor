<template>
  <div id="app">
    <VillainEditor
      :json="json"
      @input="inp"
    />
  </div>
</template>

<script>
import VillainEditor from './components/VillainEditor'

export default {
  name: 'app',
  components: {
    VillainEditor
  },
  data () {
    return {
      json: `[{"type":"text","data":{"type":"paragraph","text":"TEXT1"}},{"type":"text","data":{"type":"paragraph","text":"TEXT2"}}]`
    }
  },

  methods: {
    inp () {
      console.log('inp called')
    }
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
