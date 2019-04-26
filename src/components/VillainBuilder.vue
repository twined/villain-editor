<template>
  <div class="villain-builder-wrapper">
    <button
      class="save"
      @click="saveTemplate()">
      Lagre
    </button>
    <div class="villain-builder-editor-wrapper">
      <div
        id="builder-template"
        class="villain-builder-editor">
      </div>
    </div>
    <aside>
      <ul>
        <li
          v-for="t in templates"
          :key="t.data.id"
          @click="selectTemplate(t)">
          {{ t.data.class }}
        </li>
      </ul>
    </aside>
  </div>
</template>
<script>
import CodeFlask from 'codeflask'
import fetchTemplates from '@/utils/fetchTemplates'
import storeTemplate from '@/utils/storeTemplate'

export default {
  data () {
    return {
      flask: null,
      currentTemplate: null,
      templates: []
    }
  },

  inject: [
    'headers',
    'urls'
  ],

  async mounted () {
    this.templates = await fetchTemplates('all')
    this.flask = new CodeFlask('#builder-template', { language: 'html', lineNumbers: true })
  },

  methods: {
    selectTemplate (t) {
      this.currentTemplate = t
      this.flask.updateCode(this.currentTemplate.data.code)
    },

    async saveTemplate () {
      console.log(this.headers)
      this.currentTemplate = {
        ...this.currentTemplate,
        data: {
          ...this.currentTemplate.data,
          code: this.flask.getCode()
        }
      }

      let result = await storeTemplate(this.currentTemplate, this.headers.extra, this.urls.templates)
      console.log(result)
    }
  }
}
</script>
