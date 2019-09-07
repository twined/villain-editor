<template>
  <div id="app">
    <VillainEditor
      :json="json"
      :builder-mode="false"
      :template-mode="false"
      templates="all"
      server="http://localhost:3000"
    />
  </div>
</template>

<script>
import VillainEditor from './components/VillainEditor'

const templates = []

export default {
  name: 'App',
  components: {
    VillainEditor
  },
  data () {
    return {
      templates,
      json:
        [
          {
            'type': 'html',
            'data': {
              'text': 'Hello!\n<div>\nTest\n</div>'
            }
          },
          {
            'type': 'html',
            'data': {
              'text': ''
            }
          }
        ]
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

[data-v="image|image(staggered)"] {
  display: flex;
}

[data-v="image|image(staggered)"] figure {
  width: 50%;
}

</style>
