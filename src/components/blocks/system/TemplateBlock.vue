<template>
  <Block
    :block="block"
    :parent="parent"
    @add="$emit('add', $event)"
    @move="$emit('move', $event)"
    @delete="$emit('delete', $event)">
    <div class="villain-template-description">
      <i class="fa fa-fw fa-map mr-1" /> {{ block.data.name }}
    </div>
    <component :is="buildWrapper()" />
  </Block>
</template>

<script>
/*
Can we do this with a slot perhaps?
Extract all the code that is not ${REF}, replace ${REF} with <slot name="ref"></slot>

Create a subcomponent and then replace slots with [refs]?
*/

import Vue from 'vue'

Vue.component('component-proxy', {
  props: {
    name: {
      type: String,
      required: true
    },
    props: {
      type: Object,
      default: () => {}
    }
  },

  render (createElem) {
    return createElem(this.name, {
      block: this.block
    })
  }
})

export default {
  name: 'TemplateBlock',

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

  inject: [
    'available'
  ],

  computed: {
    templateString () {
      let str = this.buildComponents()
      return `
        <div class="${this.block.data.class}">${str}</div>
      `
    }
  },

  created () {
    console.debug('<TemplateBlock /> created')
    this.deleteProps()
    this.createTemplateContentWrapper()
  },

  methods: {
    /** remove props we don't want to store */
    deleteProps () {
      // only delete props here if we don't have an ID
      if (!this.block.data.hasOwnProperty('id')) {
        return
      }

      if (this.block.data.hasOwnProperty('namespace')) {
        delete this.block.data.namespace
      }

      if (this.block.data.hasOwnProperty('code')) {
        delete this.block.data.code
      }

      if (this.block.data.hasOwnProperty('class')) {
        delete this.block.data.class
      }

      if (this.block.data.hasOwnProperty('name')) {
        delete this.block.data.name
      }

      if (this.block.data.hasOwnProperty('help_text')) {
        delete this.block.data.help_text
      }
    },

    getSourceCode () {
      let foundTemplate
      const id = this.block.data.id

      if (!id) {
        foundTemplate = this.available.templates.find(t => t.data.class === this.block.data.class)
      } else {
        foundTemplate = this.available.templates.find(t => t.data.id === id)
      }

      if (!foundTemplate) {
        console.error('==> missing template', this.block.data)
        return '<div>!! template not found !!</div>'
      }

      this.block.data.id = foundTemplate.id
      this.deleteProps()

      return foundTemplate.data.code
    },

    replaceRefs () {
      let srcCode = this.getSourceCode()
      return srcCode.replace(/%{(\w+)}/g, this.replaceRef)
    },

    replaceRef (exp, refName) {
      return `<slot name="${refName}">REPLACE</slot>`
    },

    findRef (refName) {
      return this.block.data.refs.find(r => r.name === refName)
    },

    buildData () {
      // build it by {refname: data}
      let refs = {}
      for (let i = 0; i < this.block.data.refs.length; i++) {
        let ref = this.block.data.refs[i]
        refs[ref.name] = { ...ref.data, locked: true }
      }

      return {
        refs
      }
    },

    getDataByRefName (refs, name) {
      return refs[name]
    },

    buildSlots () {
      let template = ''
      this.copyMissingRefs()

      for (let i = 0; i < this.block.data.refs.length; i++) {
        let ref = this.block.data.refs[i]
        template += `<div slot="${ref.name}"><component is="${ref.data.type}Block" :block="refs.${ref.name}" /></div>`
      }
      return template
    },

    copyMissingRefs () {
      let foundTemplate
      const id = this.block.data.id

      if (!id) {
        foundTemplate = this.available.templates.find(t => t.data.class === this.block.data.class)
      } else {
        foundTemplate = this.available.templates.find(t => t.data.id === this.block.data.id)
      }

      if (!foundTemplate) {
        return
      }

      let templateSourceRefs = foundTemplate.data.refs
      let blockRefs = this.block.data.refs

      for (let i = 0; i < templateSourceRefs.length; i++) {
        if (!blockRefs.find(b => b.name === templateSourceRefs[i].name)) {
          this.block.data.refs = [
            ...this.block.data.refs,
            templateSourceRefs[i]
          ]
        }
      }
    },

    buildWrapper () {
      let template = `
        <TemplateContentWrapper>
          ${this.buildSlots()}
        </TemplateContentWrapper>
      `

      let data = this.buildData()
      return {
        name: 'buildwrapper',
        template,
        data () {
          return data
        }
      }
    },

    createTemplateContentWrapper () {
      Vue.component('TemplateContentWrapper', {
        template: this.replaceRefs()
      })
    }
  }
}
</script>
