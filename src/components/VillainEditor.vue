<template>
  <div
    class="villain-editor">
    <div class="villain-editor-toolbar">
      <i class="fa mr-2 fa-info-circle" />
      Trykk på "+" under for å legge til innholdsblokk!
      <div
        class="src float-right"
        @click="toggleSource()">
        <i class="fa fa-code" />
      </div>
    </div>
    <template
      v-if="showSource">
      <div class="villain-editor-source">
        <textarea ref="tasource" v-model="src" />
        <button
          class="btn btn-primary"
          @click="updateSource">
          Oppdatér
        </button>
      </div>
    </template>
    <template
      v-else>
      <BlockContainer
        v-if="blocks && blocks.length"
        :blocks="blocks"
        @add="addBlock($event)"
        @delete="deleteBlock"
        @order="orderBlocks"
      />
      <BlockContainer
        v-else
        :blocks="blocks"
        @add="addBlock($event)"
        @delete="deleteBlock"
      />
    </template>
  </div>
</template>

<script>
import autosize from 'autosize'
import cloneDeep from 'lodash/cloneDeep'

import VillainPlus from './tools/VillainPlus'
import BlockContainer from './blocks/BlockContainer'
import ColumnsBlock from './blocks/ColumnsBlock'
import HeaderBlock from './blocks/HeaderBlock'
import MarkdownBlock from './blocks/MarkdownBlock'
import TextBlock from './blocks/TextBlock'

export default {
  name: 'villain-editor',
  components: {
    BlockContainer,
    VillainPlus,
    // BLOCKS
    ColumnsBlock,
    HeaderBlock,
    MarkdownBlock,
    TextBlock
  },

  props: {
    json: {
      type: String,
      default: '[]'
    },

    baseURL: {
      type: String,
      default: '/admin/api/villain/'
    },

    browseURL: {
      type: String,
      default: '/admin/api/villain/browse/'
    },

    imageSeries: {
      type: String,
      default: 'post'
    },

    extraHeaders: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      blocks: [],
      showSource: false
    }
  },

  computed: {
    src: {
      get () {
        let bx = cloneDeep(this.blocks)
        return JSON.stringify(bx.map(b => this.stripUID(b)), null, 0)
      },

      set (v) {
        this.updatedSource = v
      }
    }
  },

  provide () {
    return {
      vBaseURL: this.baseURL,
      vBrowseURL: this.browseURL,
      vImageSeries: this.imageSeries,
      vExtraHeaders: this.extraHeaders
    }
  },

  watch: {
    blocks: {
      handler: function (val, oldVal) {
        let bx = cloneDeep(val)
        if (bx.length) {
          this.$emit('input', JSON.stringify(bx.map(b => this.stripUID(b)), null, 2))
        }
        return val
      },
      deep: true
    }
  },

  created () {
    // convert data to blocks
    if (!this.json || this.json === '') {
      this.blocks = []
    } else {
      this.blocks = JSON.parse(this.json)
      this.blocks = this.addUIDs()
    }
  },

  methods: {
    updateSource () {
      this.blocks = JSON.parse(this.updatedSource)
      this.blocks = this.addUIDs()
      this.toggleSource()
    },

    toggleSource () {
      if (this.showSource) {
        this.showSource = false
      } else {
        this.showSource = true
        autosize(this.$refs.tasource)
      }
    },

    addUIDs () {
      return [...this.blocks].map(b => {
        return { ...b, uid: this.createUID() }
      })
    },

    createUID () {
      return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
    },

    stripUID (obj) {
      if (!obj) {
        return obj
      }
      if (obj.hasOwnProperty('uid')) {
        delete obj.uid
      }
      return obj
    },

    addBlock ({block: blockType, after, parent}) {
      let block = {
        type: blockType.component.toLowerCase(),
        data: { ...blockType.dataTemplate },
        uid: blockType.uid
      }

      console.log('* adding', block)
      console.log('-> parent: ', parent)
      console.log('-> after: ', after)

      // no after, no parent = + at the top OR first one if empty
      if (!after && !parent) {
        // if we have blocks, it's the top + so we add to top
        if (this.blocks.length) {
          console.debug('add to top')
          this.blocks = [
            block,
            ...this.blocks
          ]
        } else {
          console.debug('add to bottom')
          this.blocks = [
            ...this.blocks,
            block
          ]
        }
        return
      }

      if (parent) {
        // child of a column
        let mainBlock = this.blocks.find(b => {
          if (b.type === 'columns') {
            console.log('columns', b)
            for (let i = 0; i < b.data.length; i++) {
              if (b.data[i].uid === parent) {
                return b
              }
            }
          }
        })
        let parentBlock = null
        if (mainBlock) {
          // we have the main block -- add to the correct parent
          for (let i = 0; i < mainBlock.data.length; i++) {
            if (mainBlock.data[i].uid === parent) {
              parentBlock = mainBlock.data[i]
            }
          }

          parentBlock.data = [
            ...parentBlock.data,
            block
          ]
        }
        return
      }

      if (after) {
        let p = this.blocks.find(b => b.uid === after)
        if (!p) {
          console.error('--- NO UID FOR "AFTER"-BLOCK')
        }
        let idx = this.blocks.indexOf(p)

        if (idx + 1 === this.blocks.length) {
          // index is last, just add to list
          this.blocks = [
            ...this.blocks,
            block
          ]
          return
        }

        // we're adding in the midst of things
        this.blocks = [
          ...this.blocks.slice(0, idx + 1),
          block,
          ...this.blocks.slice(idx + 1)
        ]
      }
    },

    deleteBlock ({ uid }) {
      let block = this.blocks.find(b => b.uid === uid)
      if (block) {
        let idx = this.blocks.indexOf(block)
        this.blocks = [
          ...this.blocks.slice(0, idx),
          ...this.blocks.slice(idx + 1)
        ]
      }
    },

    orderBlocks (blocks) {
      this.blocks = [...blocks]
    }
  }

}
</script>
