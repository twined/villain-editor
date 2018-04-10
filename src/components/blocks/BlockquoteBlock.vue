<template>
  <Block
    :block="block"
    :parent="parent"
    @add="$emit('add', $event)"
    @delete="$emit('delete', $event)">
    <input
      class="villain-blockquote-content"
      v-model="block.data.content">
    <input
      class="villain-blockquote-cite"
      v-model="block.data.cite">
    <template slot="config">
      <div class="form-group">
        <label>CSS klasser</label>
        <input
          v-model="block.data.class"
          class="form-control"
          type="input">
      </div>
    </template>
  </Block>
</template>

<script>
import Block from './Block'

export default {
  name: 'blockquote-block',

  components: {
    Block
  },

  data () {
    return {
      customClass: '',
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
    console.log('<BlockquoteBlock /> created')
    this.block.uid = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
  }
}
</script>
