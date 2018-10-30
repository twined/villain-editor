export default [
  {
    name: 'Tekst',
    icon: 'fa-paragraph',
    component: 'Text',
    dataTemplate: {
      'text': '',
      'type': 'paragraph'
    }
  },

  {
    name: 'Overskrift',
    icon: 'fa-heading',
    component: 'Header',
    dataTemplate: {
      'text': 'Overskrift',
      'level': 1,
      'class': ''
    }
  },

  {
    name: 'Skillelinje',
    icon: 'fa-minus',
    component: 'Divider',
    dataTemplate: {
      'text': '-------------'
    }
  },

  {
    name: 'Bilde',
    icon: 'fa-image',
    component: 'Image',
    dataTemplate: {
      url: '',
      sizes: null,
      title: '',
      credits: '',
      class: 'img-fluid'
    }
  },

  {
    name: 'Bildekarusell',
    icon: 'fa-images',
    component: 'Slideshow',
    dataTemplate: {
      imageseries: null
    }
  },

  {
    name: 'Video',
    icon: 'fa-video',
    component: 'Video',
    dataTemplate: {
      source: 'youtube',
      remote_id: ''
    }
  },

  {
    name: 'Kart',
    icon: 'fa-compass',
    component: 'Map',
    dataTemplate: {
      source: 'gmaps',
      embed_url: ''
    }
  },

  {
    name: 'Sitat',
    icon: 'fa-quote-right',
    component: 'Blockquote',
    dataTemplate: {
      'text': 'Sitat',
      'cite': 'Sitatforfatter'
    }
  },

  {
    name: 'Tidslinje',
    icon: 'fa-clock',
    component: 'Timeline',
    dataTemplate: [
      {
        'caption': '2018',
        'text': 'Tekst om hendelsen'
      }
    ]
  },

  {
    name: 'Kolonner',
    icon: 'fa-columns',
    component: 'Columns',
    dataTemplate: []
  },

  {
    name: 'Markdown',
    icon: 'fa-code',
    component: 'Markdown',
    dataTemplate: {
      'text': '## Markdown code'
    }
  },

  {
    name: 'Html',
    icon: 'fa-file-code',
    component: 'Html',
    dataTemplate: {
      'text': 'html'
    }
  }
]
