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
            'data': {
              'id': 5,
              'refs': [
                {
                  'data': {
                    'data': {
                      'credits': null,
                      'img_class': 'img-fluid',
                      'media_queries': '',
                      'picture_class': '',
                      'sizes': {
                        'large': '/media/images/site/posts/large/3bh20o219pt1.jpg',
                        'medium': '/media/images/site/posts/medium/3bh20o219pt1.jpg',
                        'micro': '/media/images/site/posts/micro/3bh20o219pt1.jpg',
                        'small': '/media/images/site/posts/small/3bh20o219pt1.jpg',
                        'thumb': '/media/images/site/posts/thumb/3bh20o219pt1.jpg',
                        'xlarge': '/media/images/site/posts/xlarge/3bh20o219pt1.jpg'
                      },
                      'srcset': '',
                      'title': null,
                      'url': '/media/images/site/posts/3bh20o219pt1.jpg',
                      'width': 781,
                      'height': 1089
                    },
                    'type': 'picture'
                  },
                  'name': 'PICTURE_1'
                },
                {
                  'data': {
                    'data': {
                      'credits': null,
                      'img_class': 'img-fluid',
                      'media_queries': '',
                      'picture_class': '',
                      'sizes': {
                        'large': '/media/images/site/posts/large/aavg132d77j.png',
                        'medium': '/media/images/site/posts/medium/aavg132d77j.png',
                        'micro': '/media/images/site/posts/micro/aavg132d77j.png',
                        'small': '/media/images/site/posts/small/aavg132d77j.png',
                        'thumb': '/media/images/site/posts/thumb/aavg132d77j.png',
                        'xlarge': '/media/images/site/posts/xlarge/aavg132d77j.png'
                      },
                      'srcset': '',
                      'title': null,
                      'url': '/media/images/site/posts/aavg132d77j.png',
                      'width': 781,
                      'height': 1090
                    },
                    'type': 'picture'
                  },
                  'name': 'PICTURE_2'
                }
              ]
            },
            'type': 'template'
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
