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
            'id': 11,
            'refs': [
              {
                'data': {
                  'data': {
                    'class': '',
                    'code': '<svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 1073.99 237.28">\n  <path d="M446.16 207.26c0 8.75-6.33 14.14-16.7 14.14h-16.29v-28.14h16.29c10.38-.01 16.7 5.25 16.7 14m-6.59-39.72c0 7.67-5.52 12.39-13.06 12.39h-13.33v-24.78h13.33c7.54 0 13.06 4.58 13.06 12.39m-43.09 67.86h33.39c21.27 0 33.26-10.77 33.26-27.06 0-11.44-6.06-19.25-15.75-23.43 6.19-3.9 9.16-10.1 9.16-18.04 0-15.89-11.98-25.72-29.22-25.72h-30.83v94.25zM903.28 188.14c0-10.64 4.44-19.79 11.71-25.72 7.27 5.92 11.71 15.08 11.71 25.72 0 10.77-4.44 19.93-11.71 25.85-7.26-5.92-11.71-15.08-11.71-25.85m33.26 33.53c-1.75 0-3.37-.13-4.98-.4 7.94-8.48 12.66-20.06 12.66-33.12 0-12.93-4.71-24.37-12.52-32.99 1.62-.13 3.23-.27 4.85-.27 18.72 0 33.26 14.14 33.26 33.26-.01 19.24-14.55 33.52-33.27 33.52m-43.08 0c-18.72 0-33.26-14.27-33.26-33.53 0-19.12 14.54-33.26 33.26-33.26 1.62 0 3.23.13 4.85.27-7.81 8.62-12.52 20.06-12.52 32.99 0 13.06 4.71 24.64 12.66 33.12-1.63.27-3.24.41-4.99.41m0 15.61c7.81 0 15.08-1.48 21.54-4.31 6.46 2.83 13.73 4.31 21.54 4.31 28.81 0 50.76-20.87 50.76-49.15 0-28.14-21.95-48.88-50.76-48.88-7.81 0-15.08 1.48-21.54 4.31-6.46-2.83-13.73-4.31-21.54-4.31-28.81 0-50.76 20.74-50.76 48.88-.01 28.28 21.94 49.15 50.76 49.15M618.97 220.72c-11.18 0-19.39-9.02-19.39-20.06V140.2h-16.97v60.46c0 19.66 15.35 35.68 36.35 35.68 21.01 0 36.35-16.02 36.35-35.68V140.2h-16.97v60.46c.02 11.04-8.19 20.06-19.37 20.06M713.45 165.92c0 6.06-4.44 9.69-10.37 9.69h-18.45v-19.39h18.45c5.93.01 10.37 3.64 10.37 9.7m-45.51 69.48h16.7v-44.7h5.52l35.01 44.7h20.33l-35.95-45.65c14.27-2.69 21.14-11.04 21.14-23.83 0-15.75-10.23-24.77-31.91-24.77h-30.83v94.25zM77.73 235.67v-94.79H61.71v58.16l-43.35-58.16H2.2v94.25h16.02V167l51.17 68.67zM169.47 141.15h16.7v94.25h-16.7zM769.97 141.15h-16.96v94.25h16.96v-54.13h41.61v54.13h16.96v-94.25h-16.96v24.5h-41.61zM318.06 141.15h-16.97v94.25h16.97v-54.13h41.6v54.13h16.97v-94.25h-16.97v24.5h-41.6zM97.95 235.4h51.98v-15.62h-35.01v-34.47h32.45v-15.62h-32.45v-12.92h34.33v-15.62h-51.3zM1025.11 156.77c17.64 0 31.37 13.33 31.37 31.37 0 18.18-13.73 31.64-31.37 31.64h-9.96v-63.01h9.96zm-26.93 78.63h26.93c27.47 0 48.88-20.06 48.88-47.26 0-27.06-21.41-46.99-48.88-46.99h-26.93v94.25zM250.05 237.28c15.35 0 27.47-4.58 35.95-13.06v-38.64h-52.51v15.35h35.28v15.75c-4.98 3.5-10.37 4.98-18.04 4.98-19.79 0-32.45-14.81-32.45-33.26 0-18.85 13.33-33.53 33.93-33.53 10.77 0 20.6 4.31 27.74 10.91v-18.31c-6.73-4.98-16.43-8.21-28.14-8.21-29.49 0-51.03 21.68-51.03 49.15-.01 27.33 20.59 48.87 49.27 48.87M522.14 221.67c-18.72 0-33.26-14.27-33.26-33.53 0-19.12 14.54-33.26 33.26-33.26s33.26 14.14 33.26 33.26c0 19.25-14.55 33.53-33.26 33.53m0 15.61c28.81 0 50.76-20.87 50.76-49.15 0-28.14-21.95-48.88-50.76-48.88s-50.76 20.74-50.76 48.88c0 28.28 21.94 49.15 50.76 49.15"/>\n  <g>\n    <path d="M147.6 81.46c-11.18 0-19.39-9.02-19.39-20.06V.94h-16.97V61.4c0 19.66 15.35 35.68 36.35 35.68s36.35-16.02 36.35-35.68V.94h-16.97V61.4c.02 11.04-8.2 20.06-19.37 20.06M242.07 26.66c0 6.06-4.44 9.69-10.37 9.69h-18.45V16.97h18.45c5.93 0 10.37 3.63 10.37 9.69m-45.51 69.48h16.7v-44.7h5.52l35.01 44.7h20.33l-35.95-45.65c14.27-2.69 21.14-11.04 21.14-23.83 0-15.75-10.23-24.77-31.91-24.77h-30.83v94.25zM50.76 82.4c-18.72 0-33.26-14.27-33.26-33.53 0-19.12 14.54-33.26 33.26-33.26s33.26 14.14 33.26 33.26c0 19.26-14.54 33.53-33.26 33.53m0 15.62c28.81 0 50.76-20.87 50.76-49.15C101.52 20.74 79.58 0 50.76 0S0 20.74 0 48.88c0 28.27 21.95 49.14 50.76 49.14"/>\n  </g>\n</svg>'
                  },
                  'type': 'svg'
                },
                'name': 'SVG'
              },
              {
                'data': {
                  'data': {
                    'text': "Scattered with magniﬁcent 19th-century buildings and stretching \nfrom the Royal Palace up to the glorious Frogner Park, Frogner, \nin the city's west end, is one of the oldest areas in Oslo and \nis home to a number of museums, art galleries, antique stores \nand restaurants.\n\n<div class=\"sommerro-button regular\">\n  <a target=\"_blank\" href=\"https://goo.gl/maps/Sv5wpGrTmPMzP1B17\" id=\"google-maps-button\">\n    <span>View on Google Maps</span> \n    <svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1\" viewBox=\"0 0 400 312.72\">\n      <path d=\"M226.72 0h-9.86v150.23H0v12.25h216.86v150.24h9.86L400 161.21v-9.7L226.72 0zm8.54 162.48H363.7c1.63 0 2.04 2.27.52 2.84l-126.8 52.77c-4.02 1.51-8.31-1.47-8.31-5.76v-43.69c0-3.4 2.75-6.16 6.15-6.16zm-6.15-18.4v-43.69c0-4.3 4.29-7.27 8.31-5.76l126.8 52.77c1.53.57 1.12 2.84-.52 2.84H235.26c-3.4-.01-6.15-2.76-6.15-6.16zm-.01-69.92V29.81c0-5.11 5.86-7.99 9.91-4.87l122.77 105.4c1.33 1.03.17 3.13-1.41 2.54L233.1 79.93c-2.4-.9-4-3.2-4-5.77zm4 158.63l127.28-52.95c1.58-.59 2.75 1.51 1.41 2.54l-122.77 105.4c-4.05 3.12-9.91.23-9.91-4.87v-44.35c-.01-2.57 1.59-4.87 3.99-5.77z\"/>\n    </svg>\n  </a>\n</div>"
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
