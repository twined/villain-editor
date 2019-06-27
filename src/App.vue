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
                        'large': '/media/images/site/posts/large/r796o3nh5d0.jpg',
                        'medium': '/media/images/site/posts/medium/r796o3nh5d0.jpg',
                        'micro': '/media/images/site/posts/micro/r796o3nh5d0.jpg',
                        'small': '/media/images/site/posts/small/r796o3nh5d0.jpg',
                        'thumb': '/media/images/site/posts/thumb/r796o3nh5d0.jpg',
                        'xlarge': '/media/images/site/posts/xlarge/r796o3nh5d0.jpg'
                      },
                      'srcset': '',
                      'title': null,
                      'url': '/media/images/site/posts/r796o3nh5d0.jpg',
                      'width': 2002,
                      'height': 2753
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
                        'large': '/media/images/site/posts/large/3eude3vkr95.png',
                        'medium': '/media/images/site/posts/medium/3eude3vkr95.png',
                        'micro': '/media/images/site/posts/micro/3eude3vkr95.png',
                        'small': '/media/images/site/posts/small/3eude3vkr95.png',
                        'thumb': '/media/images/site/posts/thumb/3eude3vkr95.png',
                        'xlarge': '/media/images/site/posts/xlarge/3eude3vkr95.png'
                      },
                      'srcset': '',
                      'title': null,
                      'url': '/media/images/site/posts/3eude3vkr95.png',
                      'width': 780,
                      'height': 1069
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
</style>
