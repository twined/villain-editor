<template>
  <div
    class="villain-editor">
    <div class="villain-editor-toolbar">
      <div class="villain-editor-instructions">
        <i class="fa mr-2 fa-info-circle" />
        Trykk på "+" under for å legge til en innholdsblokk
      </div>
      <div
        class="villain-editor-src float-right"
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
        @move="moveBlock($event)"
        @delete="deleteBlock"
        @order="orderBlocks"
      />
      <BlockContainer
        v-else
        :blocks="blocks"
        @add="addBlock($event)"
        @move="moveBlock($event)"
        @delete="deleteBlock"
      />
    </template>
  </div>
</template>

<script>
import autosize from 'autosize'
import cloneDeep from 'lodash/cloneDeep'

import VillainPlus from '@/components/tools/VillainPlus'
import BlockContainer from '@/components/blocks/BlockContainer'
import ColumnsBlock from '@/components/blocks/ColumnsBlock'
import HeaderBlock from '@/components/blocks/HeaderBlock'
import MarkdownBlock from '@/components/blocks/MarkdownBlock'
import TextBlock from '@/components/blocks/TextBlock'
import TimelineBlock from '@/components/blocks/TimelineBlock'

import STANDARD_BLOCKS from '@/config/standardBlocks.js'
import STANDARD_TEMPLATES from '@/config/standardTemplates.js'

export default {
  name: 'villain-editor',
  components: {
    BlockContainer,
    VillainPlus,

    // BLOCKS
    ColumnsBlock,
    HeaderBlock,
    MarkdownBlock,
    TextBlock,
    TimelineBlock
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
    },

    extraBlocks: {
      type: Array,
      default: () => []
    },

    visibleBlocks: {
      type: Array,
      default: () => []
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
    },

    availableBlocks () {
      let availableBlocks = STANDARD_BLOCKS

      if (this.extraBlocks.length) {
        availableBlocks = availableBlocks + STANDARD_BLOCKS
      }

      if (this.visibleBlocks.length) {
        // filter according to visibleBlocks
        availableBlocks = availableBlocks.filter(b => this.visibleBlocks.includes(b.component))
      }

      return availableBlocks
    }
  },

  provide () {
    return {
      vBaseURL: this.baseURL,
      vBrowseURL: this.browseURL,
      vImageSeries: this.imageSeries,
      vExtraHeaders: this.extraHeaders,
      vAvailableBlocks: this.availableBlocks,
      vAvailableTemplates: this.availableTemplates
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
      // If we strip UID from columns, they disappear..
      // if (obj.hasOwnProperty('data')) {
      //   if (obj.data.length) {
      //     obj.data.forEach((d, idx, data) => {
      //       this.stripUID(data[idx])
      //     })
      //   } else {
      //     this.stripUID(obj.data)
      //   }
      // }
      return obj
    },

    addBlock ({block: blockType, after, parent}) {
      let block
      if (blockType.component === 'Columns' || blockType.component === 'Timeline') {
        block = {
          type: blockType.component.toLowerCase(),
          data: [ ...blockType.dataTemplate ],
          uid: blockType.uid
        }
      } else {
        block = {
          type: blockType.component.toLowerCase(),
          data: { ...blockType.dataTemplate },
          uid: blockType.uid
        }
      }

      console.log('* adding', block)
      console.log('-> parent: ', parent)
      console.log('-> after: ', after)

      // no after, no parent = + at the top OR first one if empty
      if (!after && !parent) {
        console.log(block)
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
            for (let key of Object.keys(b.data)) {
              let x = b.data[key]
              console.log('x uid', x.uid)
              console.log('parent', parent)
              if (x.uid === parent) {
                console.log('block is', x)
                return x
              }
            }
          }
        })
        let parentBlock = null
        if (mainBlock) {
          // we have the main block -- add to the correct parent
          for (let key of Object.keys(mainBlock.data)) {
            let y = mainBlock.data[key]
            if (y.uid === parent) {
              parentBlock = y
            }
          }

          if (after) {
            let p = parentBlock.data.find(b => b.uid === after)
            if (!p) {
              console.error('--- NO UID FOR "AFTER"-BLOCK')
            }
            let idx = parentBlock.data.indexOf(p)

            if (idx + 1 === parentBlock.data.length) {
              // index is last, just add to list
              parentBlock.data = [
                ...parentBlock.data,
                block
              ]
              return
            }

            // we're adding in the midst of things
            parentBlock.data = [
              ...parentBlock.data.slice(0, idx + 1),
              block,
              ...parentBlock.data.slice(idx + 1)
            ]
          } else {
            parentBlock.data = [
              block,
              ...parentBlock.data
            ]
          }
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

    moveBlock ({block, after, parent}) {
      console.log('==> requesting to move block')

      // remove the block first

      this.deleteBlock(block)

      if (!after && !parent) {
        let b = this.blocks.find(b => b.uid === block.uid)
        let bIdx = this.blocks.indexOf(b)
        console.log(bIdx)
        // if we have blocks, it's the top + so we add to top
        if (this.blocks.length) {
          console.debug('add to top')
          this.blocks = [
            block,
            ...this.blocks
          ]
        }
      }

      /*
      ** Block is moved into a column
      */
      if (parent) {
        console.log('==> ADDING to column')
        // child of a column
        let mainBlock = this.blocks.find(b => {
          if (b.type === 'columns') {
            console.log('columns', b)
            for (let key of Object.keys(b.data)) {
              let x = b.data[key]
              console.log('x uid', x.uid)
              console.log('parent', parent)
              if (x.uid === parent) {
                console.log('block is', x)
                return x
              }
            }
          }
        })

        let parentBlock = null
        if (mainBlock) {
          // we have the main block -- add to the correct parent
          for (let key of Object.keys(mainBlock.data)) {
            let y = mainBlock.data[key]
            if (y.uid === parent) {
              parentBlock = y
            }
          }

          if (after) {
            let p = parentBlock.data.find(b => b.uid === after)
            if (!p) {
              console.error('--- NO UID FOR "AFTER"-BLOCK')
            }
            let idx = parentBlock.data.indexOf(p)

            if (idx + 1 === parentBlock.data.length) {
              // index is last, just add to list
              parentBlock.data = [
                ...parentBlock.data,
                block
              ]
              return
            }

            // we're adding in the midst of things
            parentBlock.data = [
              ...parentBlock.data.slice(0, idx + 1),
              block,
              ...parentBlock.data.slice(idx + 1)
            ]
          } else {
            parentBlock.data = [
              block,
              ...parentBlock.data
            ]
          }
        }
        return
      }

      /*
      ** Block is moved after another block, but not to a columns object
      */
      if (after) {
        let p = this.blocks.find(b => b.uid === after)
        if (!p) {
          console.error('--- NO UID FOR "AFTER"-BLOCK')
        }
        let parentIdx = this.blocks.indexOf(p)

        if (parentIdx + 1 === this.blocks.length) {
          // index is last, just add to list
          this.blocks = [
            ...this.blocks,
            block
          ]
          return
        }

        // we're adding in the midst of things
        this.blocks = [
          ...this.blocks.slice(0, parentIdx + 1),
          block,
          ...this.blocks.slice(parentIdx + 1)
        ]
      }
    },

    deleteBlock ({ uid }) {
      console.log('deleting')
      let block = this.blocks.find(b => {
        if (b.type === 'columns') {
          for (let col of b.data) {
            for (let colBlock of col.data) {
              if (colBlock.uid === uid) {
                let colIdx = col.data.indexOf(colBlock)
                col.data = [
                  ...col.data.slice(0, colIdx),
                  ...col.data.slice(colIdx + 1)
                ]
              }
            }
          }
        }
        return b.uid === uid
      })
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
