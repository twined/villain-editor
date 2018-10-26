<template>
  <Block
    :block="block"
    :parent="parent"
    @add="$emit('add', $event)"
    @move="$emit('move', $event)"
    @delete="$emit('delete', $event)">
    <div class="villain-block-divider">
      <hr>
    </div>
  </Block>
</template>

<script>
import Block from '@/components/blocks/system/Block'

export default {
  name: 'divider-block',

  components: {
    Block
  },

  data () {
    return {
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
    console.debug('<DividerBlock /> created')
  }
}
</script>
