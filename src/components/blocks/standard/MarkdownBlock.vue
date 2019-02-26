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
      class="villain-markdown-input">
    </textarea>
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
import autosize from 'autosize'
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

  created () {
    console.debug('<MarkdownBlock /> created')
  },

  mounted () {
    autosize(this.$refs.txt)
  }
}
</script>
