<template>
  <Block
    :block="block"
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
              @delete="$emit('delete', $event)"
            />

            <VillainPlus
              :after="b.id"
              :parent="uid"
              @add="$emit('add', $event)"
            />
          </div>
        </div>
        <div v-else>
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
import ColumnsBlock from './ColumnsBlock'
import HeaderBlock from './HeaderBlock'
import MarkdownBlock from './MarkdownBlock'
import TextBlock from './TextBlock'

export default {
  name: 'columns-block',

  components: {
    Block,
    BlockContainer,
    VillainPlus,
    ColumnsBlock,
    HeaderBlock,
    MarkdownBlock,
    TextBlock
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
    }
  },

  created () {
    console.log('<ColumnsBlock /> created')
    this.block.uid = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
    console.log(this.block)
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
