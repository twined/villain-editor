<template>
  <Block
    :block="block"
    :parent="parent"
    @add="$emit('add', $event)"
    @delete="$emit('delete', $event)">
    <textarea
      ref="txt"
      class="villain-markdown-input"
      v-model="block.data.text">
    </textarea>
    <template slot="config">
      This is the config contents!
    </template>
  </Block>
</template>

<script>
import autosize from 'autosize'
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
    },

    parent: {
      type: String,
      default: null
    }
  },

  data () {
    return {
    }
  },

  created () {
    console.log('<MarkdownBlock /> created')
    this.block.uid = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
  },

  mounted () {
    autosize(this.$refs.txt)
  }
}
</script>

<style lang="scss">

</style>
