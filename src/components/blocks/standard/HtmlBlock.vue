<template>
  <Block
    :block="block"
    :parent="parent"
    @add="$emit('add', $event)"
    @move="$emit('move', $event)"
    @delete="$emit('delete', $event)">
    <textarea
      ref="txt"
      v-model="block.data.text"
      class="villain-html-input">
    </textarea>
    <template slot="config">
      This is the config contents!
    </template>
  </Block>
</template>

<script>
import autosize from 'autosize'
import Block from '@/components/blocks/system/Block'

export default {
  name: 'HtmlBlock',

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
    console.debug('<HtmlBlock /> created')
  },

  mounted () {
    autosize(this.$refs.txt)
  }
}
</script>
