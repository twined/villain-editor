<template>
  <div id="app">
    <VillainEditor
      :json="json"
      :templates="templates"
      :template-mode="false"
    />
  </div>
</template>

<script>
import VillainEditor from './components/VillainEditor'

// import templates from './templates/'
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
          'type': 'slideshow',
          'data': {
            'images': [
              {
                'sizes': {
                  'large': '/media/images/site/posts/large/10aj2gtv8m6.jpg',
                  'medium': '/media/images/site/posts/medium/10aj2gtv8m6.jpg',
                  'micro': '/media/images/site/posts/micro/10aj2gtv8m6.jpg',
                  'small': '/media/images/site/posts/small/10aj2gtv8m6.jpg',
                  'thumb': '/media/images/site/posts/thumb/10aj2gtv8m6.jpg',
                  'xlarge': '/media/images/site/posts/xlarge/10aj2gtv8m6.jpg'
                },
                'credits': null,
                'title': null,
                'url': '/media/images/site/posts/10aj2gtv8m6.jpg'
              },
              {
                'url': '/media/images/site/posts/1a2fs61qn15h.jpg',
                'sizes': {
                  'large': '/media/images/site/posts/1a2fs61qn15h.jpg',
                  'medium': '/media/images/site/posts/1a2fs61qn15h.jpg',
                  'micro': '/media/images/site/posts/1a2fs61qn15h.jpg',
                  'small': '/media/images/site/posts/1a2fs61qn15h.jpg',
                  'thumb': '/media/images/site/posts/thumb/1a2fs61qn15h.jpg',
                  'xlarge': '/media/images/site/posts/1a2fs61qn15h.jpg'
                },
                'title': 'First title',
                'credits': 'First credits',
                'class': 'img-fluid'
              },
              {
                'sizes': {
                  'large': '/media/images/site/posts/large/32qho019gbpu.jpg',
                  'medium': '/media/images/site/posts/medium/32qho019gbpu.jpg',
                  'micro': '/media/images/site/posts/micro/32qho019gbpu.jpg',
                  'small': '/media/images/site/posts/small/32qho019gbpu.jpg',
                  'thumb': '/media/images/site/posts/thumb/32qho019gbpu.jpg',
                  'xlarge': '/media/images/site/posts/xlarge/32qho019gbpu.jpg'
                },
                'credits': null,
                'title': null,
                'url': '/media/images/site/posts/32qho019gbpu.jpg'
              }
            ],
            'class': 'v-slides'
          }
        },
        {
          'type': 'datatable',
          'data': [
            {
              'key': 'Nøkkel 1',
              'value': 'Innhold 1'
            },
            {
              'key': 'Nøkkel 2',
              'value': 'Innhold 2'
            },
            {
              'key': 'Nøkkel 3',
              'value': 'Innhold 3'
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
