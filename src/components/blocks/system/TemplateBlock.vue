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
  name: 'template-block',

  data () {
    return {
      customClass: '',
      uid: null
    }
  },

  computed: {
    templateString () {
      let str = this.buildComponents()
      return `
        <div class="${this.block.data.class}">${str}</div>
      `
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
    console.debug('<TemplateBlock /> created')
    this.createTemplateContentWrapper()
  },

  methods: {
    replaceRefs () {
      return this.block.data.code.replace(/%{(\w+)}/g, this.replaceRef)
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
      for (let i = 0; i < this.block.data.refs.length; i++) {
        let ref = this.block.data.refs[i]
        template += `<div slot="${ref.name}"><component is="${ref.data.type}Block" :block="refs.${ref.name}" /></div>`
      }
      return template
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
