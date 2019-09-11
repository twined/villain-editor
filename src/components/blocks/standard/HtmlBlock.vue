<template>
  <Block
    :block="block"
    :parent="parent"
    class="villain-extra-padding"
    @add="$emit('add', $event)"
    @move="$emit('move', $event)"
    @delete="$emit('delete', $event)">
    <div class="villain-block-description">
      HTML
    </div>
    <div
      ref="wrapper"
      class="villain-html-input-wrapper">
      <div
        ref="txt"
        class="villain-html-input" />
    </div>
    <template slot="config">
      This is the config contents!
    </template>
  </Block>
</template>

<script>
import { TweenMax } from 'gsap'
import CodeFlask from 'codeflask'
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
      codeFlask: null
    }
  },

  inject: ['available'],

  created () {
    console.debug('<HtmlBlock /> created')
  },

  mounted () {
    this.codeFlask = new CodeFlask(this.$refs.txt, { language: 'markup', defaultTheme: false, lineNumbers: true })

    this.codeFlask.onUpdate(code => {
      this.block.data.text = code
      this.setHeight()
    })

    this.codeFlask.updateCode(this.block.data.text)

    // set height
    this.setHeight()
  },

  methods: {
    setHeight () {
      const pre = this.$refs.txt.querySelector('.codeflask__pre')
      const wrapper = this.$refs.wrapper
      TweenMax.to(wrapper, 0.5, { height: `calc(${pre.clientHeight}px + 1rem)` })
    }
  }
}
</script>
