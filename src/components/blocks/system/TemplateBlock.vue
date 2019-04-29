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
    this.createTemplateContentWrapper()
  },

  methods: {
    getSourceCode () {
      const id = this.block.data.id
      let foundTemplate = this.available.templates.find(t => t.data.id === id)
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
      /**
       * HANDLE MISSING REFS? IF THE TEMPLATE HAS BEEN EDITED AND THE NEW REF IS MISSING, WE SHOULD INSERT AN EMPTY ONE HERE?
       */
      let missingRefs = this.missingRefs()
      let template = ''
      for (let i = 0; i < this.block.data.refs.length; i++) {
        let ref = this.block.data.refs[i]
        template += `<div slot="${ref.name}"><component is="${ref.data.type}Block" :block="refs.${ref.name}" /></div>`
      }
      return template
    },

    missingRefs () {
      let foundTemplate = this.available.templates.find(t => t.data.id === this.block.data.id)
      let templateSourceRefs = foundTemplate.data.refs
      let blockRefs = this.block.data.refs

      console.log('template refs', templateSourceRefs)
      console.log('block refs', blockRefs)
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
