<template>
  <div class="villain-builder-editor-wrapper">
    <div
      id="builder-template"
      class="villain-builder-editor">
    </div>
  </div>
</template>
<script>
import CodeFlask from 'codeflask'

export default {
  data () {
    return {
      templates: [
        {
          id: 'unique-id-1',
          name: 'Produktteaser - 2 bilder',
          help_text: 'Produktteaser, med to sidestilte bilder (høydeformat)',
          class: 'v-unique-id',
          code: '<div>%{MARKDOWN}</div>',
          refs: []
        }
      ]
    }
  },

  mounted () {
    const flask = new CodeFlask('#builder-template', { language: 'html', lineNumbers: true })
    flask.updateCode(this.templates[0].code)
  }
}
</script>
