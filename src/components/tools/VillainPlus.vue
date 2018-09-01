<template>
  <div
    ref="plus"
    class="villain-editor-plus">

    <div
      key="plus"
      class="villain-editor-plus-inactive">
      <a
        @click="active = true">
        <template v-if="draggingOver">
          Flytt blokken hit
        </template>
        <template v-else-if="active">
          <small>Legg til ny blokk</small>
        </template>
        <template v-else>
          +
        </template>
      </a>

      <VueSlideUpDown :active="active" :duration="350">
        <div class="villain-editor-plus-available-blocks">
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
      </VueSlideUpDown>
    </div>
  </div>
</template>

<script>

import VueSlideUpDown from 'vue-slide-up-down'

function createUID () {
  return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
}

export default {
  name: 'villain-plus',

  components: {
    VueSlideUpDown
  },

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
      active: false,
      draggingOver: false
    }
  },

  created () {
    console.debug('<VillainPlus /> created')
  },

  mounted () {
    console.log('addevent drop')
    this.$refs.plus.addEventListener('dragenter', this.dragEnter)
    this.$refs.plus.addEventListener('dragover', this.dragOver)
    this.$refs.plus.addEventListener('dragleave', this.dragLeave)
    this.$refs.plus.addEventListener('drop', this.onDrop)
  },

  methods: {
    addBlock (b) {
      let block = {...b, uid: createUID()}
      this.active = false
      this.$emit('add', {block: block, after: this.after, parent: this.parent})
    },

    onDrop (ev) {
      ev.preventDefault()

      let blockData = ev.dataTransfer.getData('application/villain')
      let block = JSON.parse(blockData)

      ev.currentTarget.classList.remove('villain-drag-over')
      this.draggingOver = false

      console.debug('$emit(move) - VillainPlus')
      this.$emit('move', {block, after: this.after, parent: this.parent})
    },

    dragEnter (ev) {
      ev.preventDefault()
      ev.stopPropagation()
    },

    dragOver (ev) {
      ev.dataTransfer.dropEffect = 'copy'
      ev.currentTarget.classList.add('villain-drag-over')
      this.draggingOver = true
      ev.preventDefault()
      ev.stopPropagation()
    },

    dragLeave (ev) {
      ev.currentTarget.classList.remove('villain-drag-over')
      this.draggingOver = false
      ev.preventDefault()
      ev.stopPropagation()
    }
  }
}
</script>
