<template>
  <div class="villain-editor-plus">
    <transition name="fade-fast" mode="out-in">
      <div
        v-if="!active"
        key="plus"
        class="villain-editor-plus-inactive">
        <a
          @click="active = true">
          +
        </a>
      </div>
      <div
        v-else
        key="blocks"
        class="villain-editor-plus-available-blocks">

        <div
          v-for="b in availableBlocks"
          :key="b.name"
          class="villain-editor-plus-available-block"
          @click="addBlock(b)">
          <div>
            <i
              :class="b.icon"
              class="fa fa-fw"
            />
          </div>
          <div class="villain-editor-plus-available-block-text">
            {{ b.name }}
          </div>
        </div>
        <div
          class="villain-editor-plus-close"
          @click="active = false">
          <i class="fa fa-fw fa-times-circle" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

function createUID () {
  return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
}

export default {
  name: 'villain-plus',

  props: {
    parent: {
      type: String,
      default: null
    },

    after: {
      type: String,
      default: null
    },

    availableBlocks: {
      type: Array,
      default: () => {
        return [
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
            // dataTemplate: [
            //   {
            //     'uid': createUID(),
            //     'class': 'col-sm-6',
            //     'data': [
            //       {
            //         'uid': createUID(),
            //         'type': 'text',
            //         'data': {
            //           'text': 'Kolonnetekst',
            //           'type': 'paragraph'
            //         }
            //       }
            //     ]
            //   },
            //   {
            //     'uid': createUID(),
            //     'class': 'col-sm-6',
            //     'data': [
            //       {
            //         'uid': createUID(),
            //         'type': 'text',
            //         'data': {
            //           'text': 'Kolonnetekst',
            //           'type': 'paragraph'
            //         }
            //       }
            //     ]
            //   }
            // ]
          },

          {
            name: 'Markdown',
            icon: 'fa-code',
            component: 'Markdown',
            dataTemplate: {
              'text': '## Markdown code'
            }
          }
        ]
      }
    }
  },

  data () {
    return {
      active: false
    }
  },

  created () {
    console.debug('<VillainPlus /> created')
  },

  methods: {
    addBlock (b) {
      let block = {...b, uid: createUID()}
      this.active = false
      this.$emit('add', {block: block, after: this.after, parent: this.parent})
    }
  }
}
</script>
