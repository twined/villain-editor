<template>
  <Block
    :block="block"
    :parent="parent"
    @add="$emit('add', $event)"
    @delete="$emit('delete', $event)">
    <div class="villain-block-divider">
      <hr>
    </div>
  </Block>
</template>

<script>
import Block from './Block'

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
    console.log('<DividerBlock /> created')
    this.block.uid = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
  }
}
</script>
