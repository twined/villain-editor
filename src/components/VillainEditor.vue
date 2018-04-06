<template>
  <div
    v-if="blocks.length"
    class="villain-editor">
    {{ blocks.length }}
    <BlockContainer
      :blocks="blocks"
      @add="addBlock($event)"
      @delete="deleteBlock"
    />
    <code><pre>{{ blocks }}</pre></code>
  </div>

  <div
    class="villain-editor"
    v-else>
    <div class="villain-block-container">
      <!-- no blocks -->
      NO BLOCKS!!!!
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
      }

      if (parent) {
        // child of a column
        let p = this.blocks.find(b => b.uid === parent)
        let idx = this.blocks.indexOf(p)
        this.blocks = [
          ...this.blocks.slice(0, idx),
          {...p, data: [...p.data, block]},
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
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .villain-editor {
    background-color: #efe;
  }
</style>
