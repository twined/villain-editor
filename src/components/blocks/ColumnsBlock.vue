<template>
  <Block
    :block="block"
    :parent="block.uid"
    @add="$emit('add', $event)"
    @delete="$emit('delete', $event)">

    <!-- parse each block inside columns -->
    <div class="row">
      <div
        v-for="col in block.data"
        :class="col.class">
        <div v-if="col.data.length">
          <div
            v-for="b in col.data"
            class="villain-block-container"
          >
            <component
              :is="b.type + 'Block'"
              :block="b"
              :parent="col.uid"
              :after="b.uid"
              @add="$emit('add', $event)"
              @delete="$emit('delete', $event)"
            />
          </div>
        </div>
        <div v-else>
          ELSE IN "COLUMNSBLOCK"
          <VillainPlus
            :parent="block.uid"
            @add="$emit('add', $event)"
          />
        </div>
      </div>
    </div>

    <template slot="config">
      <div class="form-group">
        <label>Antall kolonner</label>
        <input
          v-model="columnCount"
          class="form-control"
          type="input">
      </div>
    </template>
  </Block>
</template>

<script>
import Block from './Block'
import BlockContainer from './BlockContainer'
import VillainPlus from '../tools/VillainPlus'

import BlockquoteBlock from './BlockquoteBlock'
import ColumnsBlock from './ColumnsBlock'
import DividerBlock from './DividerBlock'
import HeaderBlock from './HeaderBlock'
import ImageBlock from './ImageBlock'
import MapBlock from './MapBlock'
import MarkdownBlock from './MarkdownBlock'
import TextBlock from './TextBlock'
import VideoBlock from './VideoBlock'

export default {
  name: 'columns-block',

  components: {
    Block,
    BlockContainer,
    BlockquoteBlock,
    DividerBlock,
    VillainPlus,
    ColumnsBlock,
    HeaderBlock,
    ImageBlock,
    MapBlock,
    MarkdownBlock,
    TextBlock,
    VideoBlock
  },

  data () {
    return {
      columnCount: 2,
      uid: null
    }
  },

  props: {
    block: {
      type: Object,
      default: () => {}
    },

    parent: {
      type: String,
      default: null
    }
  },

  created () {
    console.debug('<ColumnsBlock /> created')
  },

  methods: {
    createUID () {
      return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
    },

    addBlockInColumn ({block: blockType, after}) {
      let block = {
        type: blockType.component.toLowerCase(),
        data: blockType.dataTemplate
      }

      if (!after) {
        this.blocks = [
          ...this.blocks,
          block
        ]
      }
    },

    deleteBlockFromColumn ({ uid }) {
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
