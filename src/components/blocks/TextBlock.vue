<template>
  <Block
    :block="block"
    :parent="parent"
    icon="fa-paragraph"
    @add="$emit('add', $event)"
    @move="$emit('move', $event)"
    @delete="$emit('delete', $event)">
    <quill-editor
      v-model="text"
      :class="block.data.type"
      :options="quillOptions">
    </quill-editor>
    <template slot="config">
      <div class="form-check">
        <input
          v-model="block.data.type"
          class="form-check-input"
          type="radio"
          value="paragraph">
        <label class="form-check-label">
          Paragraf/brødtekst
        </label>
      </div>
      <div class="form-check">
        <input
          v-model="block.data.type"
          class="form-check-input"
          type="radio"
          value="lead">
        <label class="form-check-label">
          Ingress
        </label>
      </div>
      <div class="form-check">
        <input
          v-model="block.data.type"
          class="form-check-input"
          type="radio"
          :value="customClass">
        <label class="form-check-label">
          <div class="form-group">
            <input
              v-model="customClass"
              class="form-control"
              type="input">
          </div>
        </label>
      </div>
    </template>
  </Block>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

import Block from './Block'
import { quillEditor } from 'vue-quill-editor'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({ html: true })

export default {
  name: 'text-block',

  components: {
    Block,
    quillEditor
  },

  data () {
    return {
      customClass: '',
      quillOptions: {
        placeholder: 'Tekst her',
        modules: {
          toolbar: [
            ['bold', 'italic'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link']
          ]
        }
      }
    }
  },

  computed: {
    text: {
      get () {
        return this.block.data.text
      },

      set (txt) {
        this.block.data.text = txt
        return this.block.data.text
      }
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
    console.debug('<TextBlock /> created --', this.block.uid)
    this.text = md.render(this.block.data.text)
    this.customClass = this.block.data.type
  }
}
</script>
