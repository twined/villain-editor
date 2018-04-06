<template>
  <div v-if="blocks.length">
    <div
      v-for="b in blocks"
      class="villain-block-container"
    >
      <component
        :is="b.type + 'Block'"
        :block="b"
        @delete="$emit('delete', $event)"
      />

      <VillainPlus
        :after="b.id"
        @add="$emit('add', $event)"
      />
    </div>
  </div>
  <div v-else>
    <VillainPlus
      @add="$emit('add', $event)"
    />
  </div>

</template>

<script>
import VillainPlus from '../tools/VillainPlus'

import ColumnsBlock from './ColumnsBlock'
import HeaderBlock from './HeaderBlock'
import MarkdownBlock from './MarkdownBlock'
import TextBlock from './TextBlock'

export default {
  name: 'block-container',
  components: {
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

  created () {
    // console.log(this.blocks)
    console.log('<BlockContainer /> created')
  },

  methods: {

  }
}
</script>
