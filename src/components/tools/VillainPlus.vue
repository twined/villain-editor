<template>
  <div class="villain-editor-plus">
    <div
      v-if="!active"
      class="villain-editor-plus-inactive">
      <a
        @click="active = true">
        +
      </a>
    </div>
    <div
      v-else
      class="villain-editor-plus-available-blocks">

      <div
        v-for="b in availableBlocks"
        class="villain-editor-plus-available-block"
        @click="addBlock(b)">
        <i
          :class="b.icon"
          class="fa fa-fw"
        />
          {{ b.name }}
      </div>
      <button
        @click="active = false">
        x
      </button>
    </div>
  </div>
</template>

<script>
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
              'text': 'Tekst her',
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
            name: 'Kolonner',
            icon: 'fa-columns',
            component: 'Columns',
            dataTemplate: [
              {
                'class': 'col-sm-6',
                'data': [
                  {
                    'type': 'text',
                    'data': {
                      'text': 'Kolonnetekst',
                      'type': 'paragraph'
                    }
                  }
                ]
              },
              {
                'class': 'col-sm-6',
                'data': [
                  {
                    'type': 'text',
                    'data': {
                      'text': 'Kolonnetekst',
                      'type': 'paragraph'
                    }
                  }
                ]
              }
            ]
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
    console.log('<VillainPlus /> created')
  },

  methods: {
    addBlock (b) {
      this.active = false
      this.$emit('add', {block: b, after: this.after, parent: this.parent})
    }
  }
}
</script>
