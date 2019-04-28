<template>
  <div id="app">
    <VillainEditor
      :json="json"
      :builder-mode="true"
      :template-mode="true"
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
      json: [
        {
          'type': 'text',
          'data': {
            'type': 'paragraph',
            'text': '<p>test</p>'
          }
        },
        {
          'type': 'template',
          'data': {
            'refs': [
              {
                'name': 'MARKDOWN',
                'data': {
                  'type': 'markdown',
                  'data': {
                    'text': 'MD text!'
                  }
                }
              }
            ],
            'id': 2
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
</style>
