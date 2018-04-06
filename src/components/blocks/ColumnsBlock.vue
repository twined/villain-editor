<template>
  <Block
    :block="block"
    @delete="$emit('delete', $event)">

    <!-- parse each block inside columns -->
    <div class="row">
      <div
        v-for="col in block.data"
        :class="col.class">
        <BlockContainer
          :blocks="col.data"
          @add="addBlockInColumn($event)"
          @delete="deleteBlockFromColumn"
        />
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

export default {
  name: 'columns-block',

  components: {
    Block,
    BlockContainer
  },

  data () {
    return {
      columnCount: 2
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
    console.log(this.block)
  },

  methods: {
    addBlockInColumn ({block: blockType, after}) {
      let block = {
        uid: (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase(),
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
