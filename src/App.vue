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
      json: [
        {
          'data': {
            'id': 8,
            'refs': [
              {
                'data': {
                  'data': {
                    'images': [
                      {
                        'credits': '',
                        'height': 3303,
                        'sizes': {
                          'large': '/media/images/site/posts/large/ah1v66m5pm.jpg',
                          'medium': '/media/images/site/posts/medium/ah1v66m5pm.jpg',
                          'micro': '/media/images/site/posts/micro/ah1v66m5pm.jpg',
                          'small': '/media/images/site/posts/small/ah1v66m5pm.jpg',
                          'thumb': '/media/images/site/posts/thumb/ah1v66m5pm.jpg',
                          'xlarge': '/media/images/site/posts/xlarge/ah1v66m5pm.jpg'
                        },
                        'title': null,
                        'url': '/media/images/site/posts/ah1v66m5pm.jpg',
                        'width': 1970
                      },
                      {
                        'credits': '',
                        'height': 2189,
                        'sizes': {
                          'large': '/media/images/site/posts/large/6e75f26juiq.jpg',
                          'medium': '/media/images/site/posts/medium/6e75f26juiq.jpg',
                          'micro': '/media/images/site/posts/micro/6e75f26juiq.jpg',
                          'small': '/media/images/site/posts/small/6e75f26juiq.jpg',
                          'thumb': '/media/images/site/posts/thumb/6e75f26juiq.jpg',
                          'xlarge': '/media/images/site/posts/xlarge/6e75f26juiq.jpg'
                        },
                        'title': null,
                        'url': '/media/images/site/posts/6e75f26juiq.jpg',
                        'width': 2202
                      },
                      {
                        'credits': '',
                        'height': 3302,
                        'sizes': {
                          'large': '/media/images/site/posts/large/18ejojpi7jh.jpg',
                          'medium': '/media/images/site/posts/medium/18ejojpi7jh.jpg',
                          'micro': '/media/images/site/posts/micro/18ejojpi7jh.jpg',
                          'small': '/media/images/site/posts/small/18ejojpi7jh.jpg',
                          'thumb': '/media/images/site/posts/thumb/18ejojpi7jh.jpg',
                          'xlarge': '/media/images/site/posts/xlarge/18ejojpi7jh.jpg'
                        },
                        'title': null,
                        'url': '/media/images/site/posts/18ejojpi7jh.jpg',
                        'width': 2202
                      },
                      {
                        'credits': '',
                        'height': 1726,
                        'sizes': {
                          'large': '/media/images/site/posts/large/1e4ovs21usk8.jpg',
                          'medium': '/media/images/site/posts/medium/1e4ovs21usk8.jpg',
                          'micro': '/media/images/site/posts/micro/1e4ovs21usk8.jpg',
                          'small': '/media/images/site/posts/small/1e4ovs21usk8.jpg',
                          'thumb': '/media/images/site/posts/thumb/1e4ovs21usk8.jpg',
                          'xlarge': '/media/images/site/posts/xlarge/1e4ovs21usk8.jpg'
                        },
                        'title': null,
                        'url': '/media/images/site/posts/1e4ovs21usk8.jpg',
                        'width': 2203
                      }
                    ]
                  },
                  'type': 'slideshow'
                },
                'name': 'GALLERY'
              }
            ]
          },
          'type': 'template'
        },
        {
          'data': {
            'id': 3,
            'refs': [
              {
                'data': {
                  'data': {
                    'text': "Perched on Solli Plass, Sommerro's original architects, \n*Andreas Bjercke & Georg Eliassen*, had a vision to transform \nthe quarter into an urban hub. A pipedream that is set to \nbecome reality when Sommerro throws open its doors in Spring 2022. "
                  },
                  'type': 'markdown'
                },
                'name': 'MARKDOWN'
              }
            ]
          },
          'type': 'template'
        },
        {
          'data': {
            'id': 12,
            'refs': [
              {
                'data': {
                  'data': {
                    'credits': null,
                    'height': 2916,
                    'img_class': 'img-fluid',
                    'media_queries': '',
                    'picture_class': '',
                    'sizes': {
                      'large': '/media/images/site/posts/large/1ukpg82i1900.png',
                      'medium': '/media/images/site/posts/medium/1ukpg82i1900.png',
                      'micro': '/media/images/site/posts/micro/1ukpg82i1900.png',
                      'small': '/media/images/site/posts/small/1ukpg82i1900.png',
                      'thumb': '/media/images/site/posts/thumb/1ukpg82i1900.png',
                      'xlarge': '/media/images/site/posts/xlarge/1ukpg82i1900.png'
                    },
                    'srcset': '',
                    'title': null,
                    'url': '/media/images/site/posts/1ukpg82i1900.png',
                    'width': 2084
                  },
                  'type': 'picture'
                },
                'name': 'PICTURE_1'
              },
              {
                'data': {
                  'data': {
                    'credits': null,
                    'height': 2501,
                    'img_class': 'img-fluid',
                    'media_queries': '',
                    'picture_class': '',
                    'sizes': {
                      'large': '/media/images/site/posts/large/31gkdg3dc1ku.jpg',
                      'medium': '/media/images/site/posts/medium/31gkdg3dc1ku.jpg',
                      'micro': '/media/images/site/posts/micro/31gkdg3dc1ku.jpg',
                      'small': '/media/images/site/posts/small/31gkdg3dc1ku.jpg',
                      'thumb': '/media/images/site/posts/thumb/31gkdg3dc1ku.jpg',
                      'xlarge': '/media/images/site/posts/xlarge/31gkdg3dc1ku.jpg'
                    },
                    'srcset': '',
                    'title': null,
                    'url': '/media/images/site/posts/31gkdg3dc1ku.jpg',
                    'width': 3751
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
