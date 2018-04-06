<template>
  <Block
    :block="block"
    @delete="$emit('delete', $event)">
    <textarea
      v-model="block.data.text">
    </textarea>
    <template slot="config">
      This is the config contents!
    </template>
  </Block>
</template>

<script>
import Block from './Block'

export default {
  name: 'markdown-block',

  components: {
    Block
  },

  props: {
    block: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
    }
  },

  created () {
    console.log('<MarkdownBlock /> created')
    this.block.uid = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
  }
}
</script>

<style lang="scss">

</style>
