<template>
  <Block
    :block="block"
    :parent="parent"
    class="villain-extra-padding"
    @add="$emit('add', $event)"
    @move="$emit('move', $event)"
    @delete="$emit('delete', $event)">
    <div class="villain-block-description">
      <i class="fa fa-fw fa-map mr-1" /> Markdown
    </div>
    <div
      ref="wrapper"
      class="villain-markdown-input-wrapper">
      <div
        ref="txt"
        class="villain-markdown-input" />
    </div>
    <template slot="help">
      <p>
        Markdown formatering er en ryddig måte å formatere tekst til nettsider på.
        Her er noen av de vanligste formatene du kan bruke i denne blokka:
      </p>
      <code>*Kursiv tekst*</code> &rarr; <em>Kursiv tekst</em><br>
      <code>**Uthevet tekst**</code> &rarr; <strong>Uthevet tekst</strong><br>
      <code>[Lenke-tekst](https://www.nrk.no)</code> &rarr; <a href="https://nrk.no">Lenke-tekst</a><br>
    </template>
  </Block>
</template>

<script>
import { TweenMax } from 'gsap'
import * as Prism from 'prismjs'
import CodeFlask from 'codeflask'
import 'prismjs/components/prism-markdown'

import Block from '@/components/blocks/system/Block'

export default {
  name: 'MarkdownBlock',

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

  created () {
    console.debug('<MarkdownBlock /> created')
  },

  mounted () {
    this.codeFlask = new CodeFlask(this.$refs.txt, { language: 'markdown', defaultTheme: false, lineNumbers: true })
    this.codeFlask.addLanguage('markdown', Prism.languages.markdown)
    this.codeFlask.updateLanguage('markdown')

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
