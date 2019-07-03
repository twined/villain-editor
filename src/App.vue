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
              'id': 1,
              'refs': [
                {
                  'data': {
                    'data': {
                      'code': '        <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 701.31 82.9">\n          <g fill="#3F3D3B">\n            <path d="M28.72 41.54l4.4-16.05 4.31 16.05h-8.71zm-8.11 29.93l5.43-19.93h14.15l5.44 19.93h11.04L39.33 11.08h-11.9L10.17 71.47h10.44zM585.7 27.13c0 3.88-2.85 6.21-6.64 6.21h-11.82V20.92h11.82c3.79 0 6.64 2.33 6.64 6.21m-29.16 44.52h10.7V43h3.54l22.43 28.64h13.03L583.19 42.4c9.14-1.73 13.54-7.07 13.54-15.27 0-10.09-6.56-15.87-20.45-15.87h-19.76v60.39zM474.88 71.65h33.3V61.64h-22.43V39.55h20.79v-10h-20.79v-8.29h21.99v-10h-32.86zM663.18 41.71l4.4-16.05 4.31 16.05h-8.71zm-8.1 29.94l5.43-19.93h14.15l5.43 19.93h11.04L673.8 11.26h-11.91l-17.25 60.39h10.44zM203.5 71.82V11.08h-10.27v37.27l-27.77-37.27H155.1v60.39h10.27V27.82l32.78 44zM242.82 71.47h33.3v-10h-22.43V39.38h20.79V29.37h-20.79v-8.28h22V11.08h-32.87zM380.32 11.08l-12.58 46.25-12.58-46.25h-11.11l.16.56-12.43 45.69-12.58-46.25h-11.11l17.44 60.74h11.98l11.96-41.87 12.02 41.87h11.97l17.36-60.74z"/>\n          </g>\n        </svg>'
                    },
                    'type': 'svg'
                  },
                  'name': 'HTML'
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
                      'text': 'In Spring 2022 we are opening Norway’s first neighborhood hotel, in the former headquarters of Oslo Lysverker! We are revitalising this exceptional piece of 1930s design and architecture, creating a unique space to be enjoyed by locals and international travelers alike.\n\nSommerro will not be your usual hotel experience. It will be like dropping in to your favorite neighbor, where the door is always left open. Where you will find a simple delicious meal, share a drink in celebration, a training partner, work on a project, take in a show or bathe at the pool side.'
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
              'id': 5,
              'refs': [
                {
                  'data': {
                    'data': {
                      'credits': null,
                      'height': 2753,
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
                      'title': 'Illustration photo',
                      'url': '/media/images/site/posts/r796o3nh5d0.jpg',
                      'width': 2002
                    },
                    'type': 'picture'
                  },
                  'name': 'PICTURE_1'
                },
                {
                  'data': {
                    'data': {
                      'credits': null,
                      'height': 1069,
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
                      'title': 'Illustration photo',
                      'url': '/media/images/site/posts/3eude3vkr95.png',
                      'width': 780
                    },
                    'type': 'picture'
                  },
                  'name': 'PICTURE_2'
                }
              ]
            },
            'type': 'template'
          },
          {
            'data': {
              'id': 6,
              'refs': [
                {
                  'data': {
                    'data': {
                      'class': 'img-fluid',
                      'height': 1688,
                      'sizes': {
                        'large': '/media/images/site/posts/large/aodkc2t43gg.jpg',
                        'medium': '/media/images/site/posts/medium/aodkc2t43gg.jpg',
                        'micro': '/media/images/site/posts/micro/aodkc2t43gg.jpg',
                        'small': '/media/images/site/posts/small/aodkc2t43gg.jpg',
                        'thumb': '/media/images/site/posts/thumb/aodkc2t43gg.jpg',
                        'xlarge': '/media/images/site/posts/xlarge/aodkc2t43gg.jpg'
                      },
                      'url': '/media/images/site/posts/aodkc2t43gg.jpg',
                      'width': 3000
                    },
                    'type': 'image'
                  },
                  'name': 'COVER'
                },
                {
                  'data': {
                    'data': {
                      'remote_id': '296162587',
                      'source': 'vimeo'
                    },
                    'type': 'video'
                  },
                  'name': 'VIDEO'
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
