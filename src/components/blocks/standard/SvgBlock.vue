<template>
  <Block
    :block="block"
    :parent="parent"
    @add="$emit('add', $event)"
    @move="$emit('move', $event)"
    @delete="$emit('delete', $event)">

    <div
      ref="svg"
      class="villain-svg-input"
      v-html="block.data.code">
    </div>
    <template slot="config">
      <div class="form-group">
        <label>SVG kode</label>
        <textarea
          ref="txt"
          :style="'font-size: ' + fontSize + 'rem'"
          v-model="block.data.code"
          class="villain-header-input">
        </textarea>
      </div>

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
import autosize from 'autosize'
import Block from '@/components/blocks/system/Block'

export default {
  name: 'SvgBlock',

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
      customClass: '',
      uid: null
    }
  },

  created () {
    console.debug('<SvgBlock /> created')
  },

  mounted () {
    autosize(this.$refs.txt)
  }
}
</script>
