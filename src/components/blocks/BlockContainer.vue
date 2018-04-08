<template>
  <div v-if="blocks.length">
    <draggable
      v-model="cBlocks"
      :options="{ handle: '.villain-move' }"
      @update="updateOrder"
    >
      <div
        v-for="b in cBlocks"
        class="villain-block-container"
      >
        <component
          :is="b.type + 'Block'"
          :block="b"
          @add="$emit('add', $event)"
          @delete="$emit('delete', $event)"
        />
      </div>
    </draggable>
  </div>
  <div v-else>
    <VillainPlus
      @add="$emit('add', $event)"
    />
  </div>

</template>

<script>
import draggable from 'vuedraggable'
import VillainPlus from '../tools/VillainPlus'

import ColumnsBlock from './ColumnsBlock'
import HeaderBlock from './HeaderBlock'
import MarkdownBlock from './MarkdownBlock'
import TextBlock from './TextBlock'

export default {
  name: 'block-container',
  components: {
    draggable,
    VillainPlus,
    // BLOCKS
    ColumnsBlock,
    HeaderBlock,
    MarkdownBlock,
    TextBlock
  },

  props: {
    blocks: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    cBlocks: {
      get: function () {
        return [...this.blocks]
      },
      set: function (blocks) {
        this.$emit('order', blocks)
      }
    }
  },

  data () {
    return {
      uid: null
    }
  },

  created () {
    // console.log(this.blocks)
    console.log('<BlockContainer /> created')
    this.uid = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
  },

  methods: {
    updateOrder () {
      console.log('UPDATED, EMIT?')
    }
  }
}
</script>
