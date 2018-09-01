<template>
  <div v-if="blocks.length">
    <div
      class="villain-block-wrapper">
      <VillainPlus
        @add="$emit('add', $event)"
        @move="$emit('move', $event)"
      />
    </div>

    <transition-group name="bounce">
      <div
        v-for="b in cBlocks"
        :key="b.uid"
        class="villain-block-container">
        <component
          :is="b.type + 'Block'"
          :block="b"
          @add="$emit('add', $event)"
          @delete="$emit('delete', $event)"
          @move="$emit('move', $event)"
        />
      </div>
    </transition-group>
  </div>
  <div v-else>
    <div
      class="villain-block-wrapper">
      <VillainPlus
        @add="$emit('add', $event)"
        @move="$emit('move', $event)"
      />
    </div>
  </div>

</template>

<script>
import draggable from 'vuedraggable'
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
import TimelineBlock from './TimelineBlock'

export default {
  name: 'block-container',
  components: {
    draggable,
    VillainPlus,
    // BLOCKS
    BlockquoteBlock,
    ColumnsBlock,
    DividerBlock,
    HeaderBlock,
    ImageBlock,
    MapBlock,
    MarkdownBlock,
    TextBlock,
    VideoBlock,
    TimelineBlock
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
    console.debug('<BlockContainer /> created')
    this.uid = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
  }
}
</script>
