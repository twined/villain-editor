<template>
  <div
    v-if="blocks.length"
    class="villain-editor">
    <BlockContainer
      :blocks="blocks"
      @add="addBlock($event)"
      @delete="deleteBlock"
      @order="orderBlocks"
    />
    <code><pre>{{ blocks }}</pre></code>
  </div>

  <div
    class="villain-editor"
    v-else>
    <div class="villain-block-container">
      <!-- no blocks -->
      <BlockContainer
        :blocks="blocks"
        @add="addBlock($event)"
        @delete="deleteBlock"
      />
    </div>
  </div>
</template>

<script>
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
    }
  },

  data () {
    return {
      blocks: [],
      msg: 'Welcome to Your Vue.js App'
    }
  },

  computed: {
    output () {
      let blocksCopy = [ ...this.blocks ]
      return JSON.stringify(blocksCopy.map(b => this.stripUID(b)), null, 2)
    }
  },

  created () {
    // convert data to blocks
    this.blocks = JSON.parse(this.json)
  },

  methods: {
    stripUID (obj) {
      if (obj.hasOwnProperty('uid')) {
        delete obj.uid
      }
      return obj
    },

    addBlock ({block: blockType, after, parent}) {
      console.log('-- adding')
      let block = {
        type: blockType.component.toLowerCase(),
        data: blockType.dataTemplate
      }

      console.log('parent: ', parent)
      console.log('after: ', after)

      if (!after && !parent) {
        this.blocks = [
          ...this.blocks,
          block
        ]
        return
      }

      if (parent) {
        console.log('adding to parent', parent)
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
        let idx = this.blocks.indexOf(p)
        if (idx === this.blocks.length) {
          this.blocks = [
            ...this.blocks,
            block
          ]
          return
        }

        this.blocks = [
          ...this.blocks.slice(0, idx),
          p,
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
