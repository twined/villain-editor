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

  created () {
    console.log('<MarkdownBlock /> created')
    console.log(this.block)
  }
}
</script>

<style lang="scss">

</style>
