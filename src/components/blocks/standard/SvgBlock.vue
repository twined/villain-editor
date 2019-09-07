<template>
  <Block
    :block="block"
    :parent="parent"
    @add="$emit('add', $event)"
    @move="$emit('move', $event)"
    @delete="$emit('delete', $event)">

    <div
      ref="svg"
      class="villain-svg-output"
      v-html="block.data.code">
    </div>
    <template slot="config">
      <div class="form-group">
        <label>SVG kode</label>
        <div
          ref="wrapper"
          class="villain-svg-input-wrapper">
          <div
            ref="txt"
            class="villain-svg-input" />
        </div>
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
import { TweenMax } from 'gsap'
import CodeFlask from 'codeflask'
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
      codeFlask: null,
      customClass: '',
      uid: null
    }
  },

  created () {
    console.debug('<SvgBlock /> created')
  },

  mounted () {
    this.codeFlask = new CodeFlask(this.$refs.txt, { language: 'markup', defaultTheme: false, lineNumbers: true })

    this.codeFlask.onUpdate(code => {
      this.block.data.code = code
      this.setHeight()
    })

    this.codeFlask.updateCode(this.block.data.code)

    // set height
    setTimeout(() => { this.setHeight() }, 800)
  },

  methods: {
    setHeight () {
      const pre = this.$refs.txt.querySelector('.codeflask__pre')
      const wrapper = this.$refs.wrapper
      const preHeight = pre.getBoundingClientRect().height > 0 ? pre.getBoundingClientRect().height : 24
      TweenMax.to(wrapper, 0.5, { height: `calc(${preHeight}px + 1rem)` })
    }
  }
}
</script>
