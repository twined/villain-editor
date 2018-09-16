<template>
  <div id="app">
    <VillainEditor
      :json="json"
      :templates="templates"
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
      json: `[{"type":"text","data":{"text":"<p>OVER</p>","type":"paragraph"}},{"type":"columns","data":[{"uid":"JLJCB6Q02MSU8","class":"col-md-6","data":[{"type":"text","data":{"text":"<p>KOLONNE A1</p>","type":"paragraph"},"uid":"JLJCBC40MSBDP"},{"type":"text","data":{"text":"<p>KOLONNE A2</p>","type":"paragraph"},"uid":"JLJCBM3ZW49PW"}]},{"uid":"JLJCB6Q0C1GZV","class":"col-md-6","data":[{"type":"text","data":{"text":"<p>KOLONNE B1</p>","type":"paragraph"},"uid":"JLJCBGGGQZ2Y3"},{"type":"text","data":{"text":"<p>KOLONNE B2</p>","type":"paragraph"},"uid":"JLJCBQFTJHXM5"}]}]},{"type":"text","data":{"text":"<p>UNDER</p>","type":"paragraph"}}]`,
      templates: [
        {
          name: '2 kol, bilde + tekst',
          data: [
            {
              type: 'columns',
              data: [
                {
                  class: 'col-md-6 c',
                  data: [
                    {
                      type: 'image',
                      data: {
                        url: '',
                        sizes: null,
                        title: '',
                        credits: '',
                        class: 'img-fluid'
                      }
                    }
                  ]
                },
                {
                  class: 'col-md-6 c',
                  data: [
                    {
                      type: 'text',
                      data: { text: '<p>Tekst her</p>', type: 'paragraph' }
                    }
                  ]
                }
              ]
            }
          ]
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
